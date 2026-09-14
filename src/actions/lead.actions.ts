"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { triggerN8nLeadScoring, triggerN8nNotification } from "@/lib/n8n";
import { validateLeadInput } from "@/lib/validations/lead";
import { LeadSource, LeadStatus } from "@/types/lead";
import { getSessionUserId } from "@/lib/session";

export interface ActionResult<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}

async function ensureAuthenticated(): Promise<void> {
  if (!(await getSessionUserId())) {
    throw new Error("You must be signed in to perform this action.");
  }
}

export async function createLeadAction(formData: FormData): Promise<ActionResult> {
  try {
    await ensureAuthenticated();
    const rawData = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      company: (formData.get("company") as string) || "",
      phone: (formData.get("phone") as string) || "",
      source: (formData.get("source") as LeadSource) || "Website",
      status: (formData.get("status") as LeadStatus) || "New",
      notes: (formData.get("notes") as string) || "",
      estimatedValue: Number(formData.get("estimatedValue") || 15000),
    };

    const validation = validateLeadInput(rawData);
    if (!validation.isValid) {
      return {
        success: false,
        message: "Please correct the highlighted form errors.",
        errors: validation.errors,
      };
    }

    // Create lead in MongoDB
    const createdLead = await db.createLead({
      name: rawData.name.trim(),
      email: rawData.email.trim(),
      company: rawData.company.trim(),
      phone: rawData.phone.trim() || undefined,
      source: rawData.source,
      status: rawData.status,
      score: 50, // temporary baseline before n8n scores it
      priority: "Medium",
      notes: rawData.notes.trim() || undefined,
      estimatedValue: rawData.estimatedValue,
    });

    // IMPORTANT CHANGE: we no longer `await` the n8n scoring call here.
    // Previously this blocked the user's form submission for the full
    // AI scoring round-trip (7+ seconds in your logs). Instead we fire
    // it and let it run in the background — n8n's own "MongoDB — Update
    // Lead" step (per your workflow diagram) writes the score back when
    // it's ready, and the dashboard picks it up on next revalidation.
    //
    // NOTE: on Vercel, a serverless function is frozen the instant the
    // response is returned, so a truly "fire and forget" async call can
    // get cut off. `after()` from `next/server` (Next.js 15+) is the
    // correct way to run background work that's allowed to keep going
    // past the response. Swap this in if you're on Next 15+:
    //
    //   import { after } from "next/server";
    //   after(() => triggerLeadScoringInBackground(createdLead.id));
    //
    // If `after()` isn't available in your version, the safest option
    // is to have your n8n webhook triggered directly by the MongoDB
    // write (e.g. a Mongo change stream, or n8n polling), so the
    // Next.js request/response cycle isn't responsible for keeping the
    // scoring job alive at all.
    const config = await db.getN8nConfig();
    if (config.autoScoreOnCreate) {
      triggerLeadScoringInBackground(createdLead.id, config).catch((err) => {
        console.error("Background lead scoring failed:", err);
      });
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/leads");
    revalidatePath("/dashboard/analytics");

    return {
      success: true,
      message: config.autoScoreOnCreate
        ? "Lead created successfully! AI scoring is running in the background."
        : "Lead created successfully.",
      data: createdLead,
    };
  } catch (error: any) {
    console.error("Failed to create lead:", error);
    return {
      success: false,
      message: error?.message || "Internal server error occurred while creating lead.",
    };
  }
}

async function triggerLeadScoringInBackground(
  leadId: string,
  connection?: { webhookUrl?: string; webhookSecret?: string; alertOnHighPriority?: boolean }
) {
  const lead = await db.getLeadById(leadId);
  if (!lead) return;

  const scoringResult = await triggerN8nLeadScoring(lead, connection);

  await db.updateLead(leadId, {
    score: scoringResult.score,
    priority: scoringResult.priority,
    scoringRationale: scoringResult.rationale,
    scoredAt: new Date().toISOString(),
    status: scoringResult.score >= 80 ? "Qualified" : lead.status,
  });

  if (scoringResult.score >= 80 && connection?.alertOnHighPriority !== false) {
    await triggerN8nNotification({
      title: `High Priority Lead Alert: ${lead.name}`,
      message: `${lead.name} from ${lead.company} scored ${scoringResult.score}/100. Potential value: $${lead.estimatedValue?.toLocaleString()}`,
      type: "lead_alert",
    });
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  newStatus: LeadStatus
): Promise<ActionResult> {
  try {
    await ensureAuthenticated();
    const updated = await db.updateLead(leadId, { status: newStatus });
    if (!updated) {
      return { success: false, message: "Lead not found" };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/leads");
    revalidatePath(`/dashboard/leads/${leadId}`);

    return {
      success: true,
      message: `Status updated to ${newStatus}`,
      data: updated,
    };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update status" };
  }
}

export async function rescoreLeadAction(leadId: string): Promise<ActionResult> {
  try {
    await ensureAuthenticated();
    const lead = await db.getLeadById(leadId);
    if (!lead) {
      return { success: false, message: "Lead not found" };
    }

    const scoringResult = await triggerN8nLeadScoring(lead, await db.getN8nConfig());

    const updated = await db.updateLead(leadId, {
      score: scoringResult.score,
      priority: scoringResult.priority,
      scoringRationale: scoringResult.rationale,
      scoredAt: new Date().toISOString(),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/leads");
    revalidatePath(`/dashboard/leads/${leadId}`);

    return {
      success: true,
      message: `AI Rescoring complete: ${scoringResult.score}/100`,
      data: updated,
    };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to rescore lead" };
  }
}

export async function deleteLeadAction(leadId: string): Promise<ActionResult> {
  try {
    await ensureAuthenticated();
    const deleted = await db.deleteLead(leadId);
    if (!deleted) {
      return { success: false, message: "Lead not found or already deleted" };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/leads");

    return { success: true, message: "Lead deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete lead" };
  }
}

export async function toggleTaskAction(taskId: string, completed: boolean): Promise<ActionResult> {
  try {
    await ensureAuthenticated();
    const updated = await db.updateTask(taskId, { completed });
    if (!updated) {
      return { success: false, message: "Task not found" };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/tasks");

    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to toggle task" };
  }
}

export async function getTasksAction() {
  await ensureAuthenticated();
  return db.getTasks();
}

export async function updateN8nConfigAction(formData: FormData): Promise<ActionResult> {
  try {
    await ensureAuthenticated();
    const webhookUrl = (formData.get("webhookUrl") as string) || "";
    const webhookSecret = (formData.get("webhookSecret") as string) || "";
    const autoScoreOnCreate = formData.get("autoScoreOnCreate") === "true";
    const alertOnHighPriority = formData.get("alertOnHighPriority") === "true";

    const updated = await db.updateN8nConfig({
      webhookUrl,
      webhookSecret,
      autoScoreOnCreate,
      alertOnHighPriority,
    });

    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "n8n automation configuration updated successfully!",
      data: updated,
    };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update configuration" };
  }
}

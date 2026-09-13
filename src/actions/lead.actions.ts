"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { triggerN8nLeadScoring, triggerN8nNotification } from "@/lib/n8n";
import { validateLeadInput } from "@/lib/validations/lead";
import { LeadSource, LeadStatus } from "@/types/lead";

export interface ActionResult<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}

export async function createLeadAction(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      company: (formData.get("company") as string) || "",
      phone: (formData.get("phone") as string) || "",
      source: (formData.get("source") as LeadSource) || "Website",
      status: (formData.get("status") as LeadStatus) || "New",
      notes: (formData.get("notes") as string) || "",
      estimatedValue: Number(formData.get("estimatedValue")) || 15000,
    };

    const validation = validateLeadInput(rawData);
    if (!validation.isValid) {
      return {
        success: false,
        message: "Please correct the highlighted form errors.",
        errors: validation.errors,
      };
    }

    // Create lead in DB
    const createdLead = db.createLead({
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

    // Asynchronously dispatch to n8n AI Lead Scoring engine
    const scoringResult = await triggerN8nLeadScoring(createdLead);

    // Update with computed score and rationale
    const finalLead = db.updateLead(createdLead.id, {
      score: scoringResult.score,
      priority: scoringResult.priority,
      scoringRationale: scoringResult.rationale,
      scoredAt: new Date().toISOString(),
      status: scoringResult.score >= 80 ? "Qualified" : createdLead.status,
    });

    // If high-value prospect, trigger high-priority alert workflow
    if (scoringResult.score >= 80) {
      await triggerN8nNotification({
        title: `High Priority Lead Alert: ${createdLead.name}`,
        message: `${createdLead.name} from ${createdLead.company} scored ${scoringResult.score}/100. Potential value: $${createdLead.estimatedValue?.toLocaleString()}`,
        type: "lead_alert",
      });
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/leads");
    revalidatePath("/dashboard/analytics");

    return {
      success: true,
      message: "Lead created and AI scoring completed successfully!",
      data: finalLead,
    };
  } catch (error: any) {
    console.error("Failed to create lead:", error);
    return {
      success: false,
      message: error?.message || "Internal server error occurred while creating lead.",
    };
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  newStatus: LeadStatus
): Promise<ActionResult> {
  try {
    const updated = db.updateLead(leadId, { status: newStatus });
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
    const lead = db.getLeadById(leadId);
    if (!lead) {
      return { success: false, message: "Lead not found" };
    }

    const scoringResult = await triggerN8nLeadScoring(lead);

    const updated = db.updateLead(leadId, {
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
    const deleted = db.deleteLead(leadId);
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
    const updated = db.updateTask(taskId, { completed });
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

export async function updateN8nConfigAction(formData: FormData): Promise<ActionResult> {
  try {
    const webhookUrl = (formData.get("webhookUrl") as string) || "";
    const webhookSecret = (formData.get("webhookSecret") as string) || "";
    const autoScoreOnCreate = formData.get("autoScoreOnCreate") === "true";
    const alertOnHighPriority = formData.get("alertOnHighPriority") === "true";

    const updated = db.updateN8nConfig({
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

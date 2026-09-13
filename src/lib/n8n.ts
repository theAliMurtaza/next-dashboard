import { Lead } from "@/types/lead";

interface NewLeadWebhookPayload {
  leadId: string;
  name: string;
  email: string;
  company: string;
  source: string;
  notes?: string;
}

interface ScoringResult {
  score: number;
  priority: "Low" | "Medium" | "High" | "Critical";
  rationale: string;
}

interface NotificationPayload {
  title: string;
  message: string;
  type: string;
}

/** Base helper: POST JSON to n8n webhook */
async function postToN8n(payload: Record<string, unknown>): Promise<Response> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("N8N_WEBHOOK_URL environment variable is not configured.");
  }

  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.N8N_WEBHOOK_SECRET
        ? { "x-webhook-secret": process.env.N8N_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Trigger the n8n lead-scoring workflow.
 * Returns a scoring result; falls back to a local heuristic if the webhook
 * is not reachable (dev / staging environments without a live n8n instance).
 */
export async function triggerN8nLeadScoring(lead: Lead): Promise<ScoringResult> {
  try {
    const response = await postToN8n({
      event: "lead.score",
      leadId: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      source: lead.source,
      estimatedValue: lead.estimatedValue,
      notes: lead.notes,
    });

    if (response.ok) {
      const data = await response.json();
      return {
        score: Number(data.score) || 70,
        priority: (data.priority as ScoringResult["priority"]) || "Medium",
        rationale: data.rationale || "Scored by n8n AI workflow.",
      };
    }
  } catch {
    // Webhook not available – use local fallback scoring
  }

  // Local heuristic fallback for development / offline mode
  const value = lead.estimatedValue ?? 10000;
  const score =
    Math.min(
      100,
      50 +
        Math.floor(value / 2000) +
        (lead.source === "Referral" ? 10 : 0) +
        (lead.notes && lead.notes.length > 50 ? 5 : 0)
    );

  const priority: ScoringResult["priority"] =
    score >= 90 ? "Critical" : score >= 75 ? "High" : score >= 55 ? "Medium" : "Low";

  return {
    score,
    priority,
    rationale: `Local heuristic score based on estimated value ($${value.toLocaleString()}) and lead source (${lead.source}).`,
  };
}

/**
 * Send a high-priority notification through n8n (Slack / email / etc.).
 * Silently fails if the webhook is unavailable so it never blocks the main flow.
 */
export async function triggerN8nNotification(payload: NotificationPayload): Promise<void> {
  try {
    await postToN8n({
      event: "notification.send",
      ...payload,
    });
  } catch {
    console.warn("[n8n] Notification webhook skipped (not reachable).");
  }
}

/**
 * Original webhook helper – kept for backward compatibility.
 * Prefer triggerN8nLeadScoring for new code.
 */
export async function triggerNewLeadWorkflow(lead: NewLeadWebhookPayload): Promise<unknown> {
  try {
    const response = await postToN8n({
      event: "lead.created",
      ...lead,
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.warn("[n8n] triggerNewLeadWorkflow failed:", error);
    return null;
  }
}
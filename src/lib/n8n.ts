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

interface N8nConnection {
  webhookUrl?: string;
  webhookSecret?: string;
}

/** Base helper: POST JSON to n8n webhook */
async function postToN8n(
  payload: Record<string, unknown>,
  connection?: N8nConnection
): Promise<Response> {
  const webhookUrl = connection?.webhookUrl || process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("N8N_WEBHOOK_URL environment variable is not configured.");
  }

  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(connection?.webhookSecret || process.env.N8N_WEBHOOK_SECRET
        ? { "x-opspilot-secret": connection?.webhookSecret || process.env.N8N_WEBHOOK_SECRET! }
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
export async function triggerN8nLeadScoring(
  lead: Lead,
  connection?: N8nConnection
): Promise<ScoringResult> {
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
    }, connection);

    if (response.ok) {
      const data = await response.json();
      const score = Number(data.score);
      if (!Number.isFinite(score) || score < 0 || score > 100) {
        return createLocalFallbackScore(lead, "n8n returned no valid numeric score");
      }
      return {
        score: Math.round(score),
        priority: (data.priority as ScoringResult["priority"]) || "Medium",
        rationale: data.rationale || "Scored by n8n AI workflow.",
      };
    }
  } catch {
    // Webhook not available – use local fallback scoring
  }

  return createLocalFallbackScore(lead, "n8n endpoint was unavailable");
}

function createLocalFallbackScore(lead: Lead, reason: string): ScoringResult {
  // Development fallback: deliberately varied to make the lead pipeline and
  // manual re-score control useful when no n8n response is available.
  // A real numeric score returned by n8n always wins above.
  const value = lead.estimatedValue ?? 10000;
  const valueSignal = Math.min(12, Math.floor(value / 10_000) * 3);
  const sourceSignal = lead.source === "Referral" ? 8 : lead.source === "Website" ? 3 : 0;
  const notesSignal = lead.notes && lead.notes.length > 50 ? 4 : 0;
  const variation = Math.floor(Math.random() * 41) - 20;
  const score = Math.max(30, Math.min(98, 62 + valueSignal + sourceSignal + notesSignal + variation));

  const priority: ScoringResult["priority"] =
    score >= 90 ? "Critical" : score >= 75 ? "High" : score >= 55 ? "Medium" : "Low";

  return {
    score,
    priority,
    rationale: `Local fallback score (${reason}). Generated from lead signals with test variation; it was not supplied by n8n.`,
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

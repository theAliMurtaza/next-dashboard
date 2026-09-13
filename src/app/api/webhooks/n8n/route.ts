import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const config = db.getN8nConfig();

    const incomingSecret = request.headers.get("x-opspilot-secret");
    if (config.webhookSecret && incomingSecret && incomingSecret !== config.webhookSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Invalid webhook secret token.",
        },
        { status: 401 }
      );
    }

    const { event, leadId, score, priority, rationale, lead, task } = body;

    console.log(`[n8n Webhook] Event received: ${event}`, body);

    // Process different event triggers from n8n
    if (event === "lead.scored" || (leadId && typeof score === "number")) {
      const targetId = leadId || body.id;
      if (targetId) {
        db.updateLead(targetId, {
          score: Math.min(100, Math.max(0, Math.round(score))),
          priority: priority || (score >= 80 ? "High" : score >= 60 ? "Medium" : "Low"),
          scoringRationale: rationale || "Evaluated by external n8n AI workflow.",
          scoredAt: new Date().toISOString(),
          status: score >= 80 ? "Qualified" : undefined,
        });
      }
    } else if (event === "lead.create" && lead) {
      db.createLead(lead);
    } else if (event === "task.create" && task) {
      db.createTask(task);
    } else if (event === "ping") {
      db.addActivity({
        title: "n8n Webhook Ping",
        description: "Webhook connection test verified successfully.",
        iconType: "automation",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed and state updated successfully.",
      event: event || "generic.webhook",
      timestamp: new Date().toISOString(),
      receivedData: body,
    });
  } catch (error: any) {
    console.error("[n8n Webhook Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Invalid webhook payload or internal server error.",
        error: error?.message,
      },
      { status: 400 }
    );
  }
}
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const n8nConfig = db.getN8nConfig();

  return NextResponse.json({
    status: "healthy",
    service: "OpsPilot Next.js API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    automation: {
      n8nConfigured: Boolean(n8nConfig.webhookUrl),
      totalExecutions: n8nConfig.totalExecutions,
      successRate: n8nConfig.successRate,
    },
  });
}
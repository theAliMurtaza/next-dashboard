"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Key,
  Loader2,
  Radio,
  Save,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import { updateN8nConfigAction } from "@/actions/lead.actions";

interface N8nSettingsFormProps {
  initialConfig: {
    webhookUrl: string;
    webhookSecret: string;
    autoScoreOnCreate: boolean;
    alertOnHighPriority: boolean;
  };
}

export function N8nSettingsForm({ initialConfig }: N8nSettingsFormProps) {
  const [webhookUrl, setWebhookUrl] = useState(initialConfig.webhookUrl);
  const [webhookSecret, setWebhookSecret] = useState(initialConfig.webhookSecret);
  const [autoScore, setAutoScore] = useState(initialConfig.autoScoreOnCreate);
  const [alertHigh, setAlertHigh] = useState(initialConfig.alertOnHighPriority);

  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("webhookUrl", webhookUrl);
    formData.append("webhookSecret", webhookSecret);
    formData.append("autoScoreOnCreate", String(autoScore));
    formData.append("alertOnHighPriority", String(alertHigh));

    try {
      const res = await updateN8nConfigAction(formData);
      if (res.success) {
        setFeedback({ type: "success", message: "n8n settings updated and persisted!" });
      } else {
        setFeedback({ type: "error", message: res.message || "Failed to update." });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save settings." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestPing = async () => {
    setIsTesting(true);
    setFeedback(null);

    try {
      // Test the local Next.js webhook listener or remote n8n webhook
      const res = await fetch("/api/webhooks/n8n", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-opspilot-secret": webhookSecret,
        },
        body: JSON.stringify({
          event: "ping",
          timestamp: new Date().toISOString(),
          testPayload: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setFeedback({
          type: "success",
          message: `Webhook connection test passed: "${data.message}" (HTTP 200 OK)`,
        });
      } else {
        setFeedback({
          type: "error",
          message: `Webhook test returned HTTP ${res.status}`,
        });
      }
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: `Connection test failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-8"
    >
      {feedback && (
        <div
          className={`flex items-center gap-3 rounded-xl p-4 text-sm ${
            feedback.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Webhook URL Input */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Server className="h-3.5 w-3.5 text-blue-500" />
          n8n Webhook Endpoint URL
        </label>
        <input
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="https://n8n.yourdomain.com/webhook/opspilot-lead-score"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-mono text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
        />
        <p className="mt-1.5 text-xs text-slate-400">
          When leads are added or updated, OpsPilot dispatches a POST request with the lead payload to this endpoint.
        </p>
      </div>

      {/* Secret Token */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Key className="h-3.5 w-3.5 text-blue-500" />
          Webhook Secret Token
        </label>
        <input
          type="password"
          value={webhookSecret}
          onChange={(e) => setWebhookSecret(e.target.value)}
          placeholder="Enter authorization secret..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-mono text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
        />
        <p className="mt-1.5 text-xs text-slate-400">
          Passed in header <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">x-opspilot-secret</code> for authentication.
        </p>
      </div>

      {/* Automation Toggles */}
      <div className="space-y-4 border-t border-slate-100 pt-5 dark:border-slate-800">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={autoScore}
            onChange={(e) => setAutoScore(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Automatically trigger AI scoring when a new lead is created
            </span>
            <p className="text-xs text-slate-400">
              Immediately dispatches lead parameters to n8n to classify purchase intent without manual action.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={alertHigh}
            onChange={(e) => setAlertHigh(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Dispatch real-time notification alert when AI Score ≥ 80 (Hot Lead)
            </span>
            <p className="text-xs text-slate-400">
              Sends urgent notifications to connected communication channels.
            </p>
          </div>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleTestPing}
          disabled={isTesting}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {isTesting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Testing Endpoint...
            </>
          ) : (
            <>
              <Radio className="h-3.5 w-3.5 text-blue-500" />
              Test Webhook Connection
            </>
          )}
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              Save Configuration
            </>
          )}
        </button>
      </div>
    </form>
  );
}

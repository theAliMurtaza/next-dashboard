"use client";

import { useState, useTransition } from "react";
import { Save } from "lucide-react";
import { updateNotificationSettingsAction } from "@/actions/auth.actions";
import type { User } from "@/models/user.model";

const options = [["highScoreLeadNotification", "High-priority leads", "Notify when a prospect scores 80 or higher."], ["n8nWebhookAlerts", "Workflow alerts", "Forward alerts to your connected n8n workflow."], ["emailAlerts", "Email notifications", "Receive immediate operational alerts by email."], ["dailyDigest", "Daily digest", "Receive a daily summary of pipeline activity."]] as const;

export function NotificationSettingsForm({ initialSettings }: { initialSettings: User["settings"] }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  return <form action={() => startTransition(async () => { const result = await updateNotificationSettingsAction(settings); setMessage(result.message ?? "Unable to save preferences."); })} className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-8"><div className="space-y-3">{options.map(([key, title, description]) => <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-3 transition hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"><input type="checkbox" checked={settings[key]} onChange={(event) => setSettings((current) => ({ ...current, [key]: event.target.checked }))} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /><span><span className="block text-sm font-semibold text-slate-900 dark:text-white">{title}</span><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{description}</span></span></label>)}</div><div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-slate-800"><p aria-live="polite" className="text-xs text-slate-500 dark:text-slate-400">{message}</p><button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-60"><Save className="h-3.5 w-3.5" />{isPending ? "Saving…" : "Save Preferences"}</button></div></form>;
}

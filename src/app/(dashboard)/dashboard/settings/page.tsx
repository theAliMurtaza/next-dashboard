import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  Key,
  Radio,
  Save,
  Server,
  Settings,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db";
import { N8nSettingsForm } from "./n8n-settings-form";

export default function SettingsPage() {
  const n8nConfig = db.getN8nConfig();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Settings & Integrations
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Configure system settings, workspace preferences, and your n8n workflow integration.
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-slate-200/80 dark:border-slate-800">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 border-b-2 border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400"
        >
          <Zap className="h-4 w-4" />
          n8n & Webhooks
        </Link>
        <Link
          href="/dashboard/settings/notifications"
          className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <Bell className="h-4 w-4" />
          Notifications
        </Link>
        <Link
          href="/dashboard/settings/profile"
          className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
      </div>

      {/* n8n Automation Settings Form */}
      <section className="space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            n8n Automation Engine Connection
          </h2>
          <p className="text-xs text-slate-400">
            Define the webhook endpoint for AI lead qualification, scoring, and automated alerts.
          </p>
        </div>

        <N8nSettingsForm initialConfig={n8nConfig} />
      </section>

      {/* Workspace General Config */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Workspace Preferences
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Workspace Name
            </label>
            <input
              defaultValue="OpsPilot Production Workspace"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Default Pipeline Currency
            </label>
            <select
              defaultValue="USD"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
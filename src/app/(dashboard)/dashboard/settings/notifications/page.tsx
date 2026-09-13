import Link from "next/link";
import {
  Bell,
  Mail,
  MessageSquare,
  Radio,
  Save,
  Shield,
  Sparkles,
  User,
  Zap,
} from "lucide-react";

export default function NotificationsSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Notification Preferences
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Control how and when you receive real-time alerts from n8n workflows and team actions.
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-slate-200/80 dark:border-slate-800">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <Zap className="h-4 w-4" />
          n8n & Webhooks
        </Link>
        <Link
          href="/dashboard/settings/notifications"
          className="flex items-center gap-2 border-b-2 border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400"
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

      {/* Notification Options Form */}
      <form className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="space-y-6">
          {/* AI Alerts */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              AI Lead Scoring Alerts
            </h3>
            <p className="text-xs text-slate-400">
              Trigger instant notifications when incoming prospects pass qualification gates.
            </p>

            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    High Priority Leads (Score ≥ 80)
                  </span>
                  <p className="text-xs text-slate-400">
                    Send high-priority alert immediately via email and connected webhook.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    Status Change Notifications
                  </span>
                  <p className="text-xs text-slate-400">
                    Notify when a prospect is marked Qualified, Converted, or Lost.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Delivery Channels */}
          <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-500" />
              Delivery Channels
            </h3>
            <p className="text-xs text-slate-400">
              Select where system updates should be routed.
            </p>

            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    Email Digest (admin@opspilot.dev)
                  </span>
                  <p className="text-xs text-slate-400">
                    Receive daily morning summary report with key pipeline movement.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    n8n Webhook Forwarding
                  </span>
                  <p className="text-xs text-slate-400">
                    Forward notification payloads to n8n to post into Slack, Discord, or Teams.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
          >
            <Save className="h-3.5 w-3.5" />
            Save Notification Settings
          </button>
        </div>
      </form>
    </div>
  );
}
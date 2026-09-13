import Link from "next/link";
import {
  Bell,
  Camera,
  Save,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { CURRENT_USER } from "@/models/user.model";

export default function ProfileSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Personal Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your personal account details and credentials.
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
          className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <Bell className="h-4 w-4" />
          Notifications
        </Link>
        <Link
          href="/dashboard/settings/profile"
          className="flex items-center gap-2 border-b-2 border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
      </div>

      {/* Profile Card */}
      <form className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-md shadow-blue-500/20">
              {CURRENT_USER.initials}
            </div>
            <button
              type="button"
              className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-lg border border-white bg-slate-800 text-white shadow-xs hover:bg-slate-700 dark:border-slate-900"
              aria-label="Change avatar"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {CURRENT_USER.name}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Shield className="h-3 w-3" />
                Administrator
              </span>
            </div>
            <p className="text-xs text-slate-400">{CURRENT_USER.title}</p>
            <p className="text-xs text-slate-500">{CURRENT_USER.organization}</p>
          </div>
        </div>

        <div className="grid gap-5 pt-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              defaultValue={CURRENT_USER.name}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={CURRENT_USER.email}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Job Title
            </label>
            <input
              defaultValue={CURRENT_USER.title}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Organization
            </label>
            <input
              defaultValue={CURRENT_USER.organization}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
          >
            <Save className="h-3.5 w-3.5" />
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
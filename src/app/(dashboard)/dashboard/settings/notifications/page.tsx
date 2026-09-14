import Link from "next/link";
import { Bell, User, Zap } from "lucide-react";
import { requireUser } from "@/actions/auth.actions";
import { NotificationSettingsForm } from "@/components/auth/notification-settings-form";

export default async function NotificationsSettingsPage() {
  const user = await requireUser();
  return <div className="mx-auto max-w-4xl space-y-8"><div><h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Notification Preferences</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose the updates that are worth interrupting your day for.</p></div><nav aria-label="Settings" className="flex overflow-x-auto border-b border-slate-200/80 dark:border-slate-800"><Link href="/dashboard/settings" className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"><Zap className="h-4 w-4" />n8n & Webhooks</Link><Link href="/dashboard/settings/notifications" className="flex shrink-0 items-center gap-2 border-b-2 border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400"><Bell className="h-4 w-4" />Notifications</Link><Link href="/dashboard/settings/profile" className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"><User className="h-4 w-4" />Profile</Link></nav><NotificationSettingsForm initialSettings={user.settings} /></div>;
}

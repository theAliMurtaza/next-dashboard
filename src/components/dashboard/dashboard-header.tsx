"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  Plus,
  Search,
  User,
} from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/leads": "Leads Pipeline",
  "/dashboard/leads/new": "Add New Lead",
  "/dashboard/customers": "Customers",
  "/dashboard/tasks": "Operational Tasks",
  "/dashboard/analytics": "Analytics & Automation",
  "/dashboard/settings": "Settings & Webhooks",
  "/dashboard/settings/notifications": "Notifications & Alerts",
  "/dashboard/settings/profile": "Profile Settings",
};

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();

  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/dashboard/leads/")
      ? "Lead Details"
      : pathname.startsWith("/dashboard/customers/")
      ? "Customer Details"
      : pathname.startsWith("/dashboard/tasks/")
      ? "Task Details"
      : "Dashboard");

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            {title}
          </h1>
          <p className="hidden text-xs text-slate-400 sm:block">
            OpsPilot AI Operations Management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Search trigger */}
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-400 md:flex dark:border-slate-700 dark:bg-slate-800/50">
          <Search className="h-3.5 w-3.5" />
          <span>Quick search...</span>
          <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            ⌘K
          </kbd>
        </div>

        {/* Quick Add Lead button */}
        <Link
          href="/dashboard/leads/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 sm:px-3.5 sm:py-2"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add Lead</span>
        </Link>

        {/* Notification Bell */}
        <Link
          href="/dashboard/settings/notifications"
          className="relative rounded-xl border border-slate-200/80 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
        </Link>

        {/* Profile Link */}
        <Link
          href="/dashboard/settings/profile"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100 text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          aria-label="Profile Settings"
        >
          <User className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
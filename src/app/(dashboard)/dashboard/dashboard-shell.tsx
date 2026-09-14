"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sidebar } from "@/components/dashboard/sidebar";
import type { User } from "@/models/user.model";

export function DashboardShell({ children, user }: { children: React.ReactNode; user: User }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="flex min-h-screen bg-slate-50/50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100"><Sidebar user={user} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="flex min-w-0 flex-1 flex-col"><DashboardHeader onMenuClick={() => setSidebarOpen(true)} /><main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main></div></div>;
}

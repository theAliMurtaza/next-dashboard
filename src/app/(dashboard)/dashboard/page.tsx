import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  Plus,
  Radio,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { StatCard } from "@/components/dashboard/stat-card";
import { db } from "@/lib/db";

export default function DashboardPage() {
  const stats = db.getStats();
  const n8nConfig = db.getN8nConfig();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page greeting & quick CTA */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Radio className="h-3 w-3 animate-pulse" />
            n8n Automation Engine Connected
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Welcome back, Alex 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here is your live business pipeline and AI workflow telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/leads/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add New Lead
          </Link>
        </div>
      </section>

      {/* KPI Stats Section */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          change="+12.5%"
          description="vs last month"
          icon={<Users className="h-5 w-5" />}
          positive={true}
        />

        <StatCard
          title="Qualified Prospects"
          value={stats.qualifiedLeads}
          change="+8.4%"
          description="AI score ≥ 70"
          icon={<Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
          positive={true}
        />

        <StatCard
          title="Active Customers"
          value={stats.totalCustomers}
          change="+14.2%"
          description="enterprise accounts"
          icon={<Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
          positive={true}
        />

        <StatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          change="5.1%"
          description="scheduled actions"
          icon={<CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
          positive={false}
        />
      </section>

      {/* Automation System Status Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white p-6 shadow-xs dark:border-blue-900/50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-900">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <Zap className="h-4 w-4 fill-white" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                n8n Workflow Automation Hub
              </h2>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Automatic lead qualification, AI score evaluations, and real-time alerts are running active webhook listeners.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Operational
            </div>

            <Link
              href="/dashboard/settings"
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Configure Webhook
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/80 bg-white/80 p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-800/60">
            <p className="text-xs text-slate-400">Total Executions</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {n8nConfig.totalExecutions.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
              ↑ 142 triggered today
            </p>
          </div>

          <div className="rounded-xl border border-white/80 bg-white/80 p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-800/60">
            <p className="text-xs text-slate-400">Success Rate</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {n8nConfig.successRate}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Target SLA: 98.0%
            </p>
          </div>

          <div className="rounded-xl border border-white/80 bg-white/80 p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-800/60">
            <p className="text-xs text-slate-400">Average AI Score</p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">83</p>
              <span className="text-xs text-slate-400">/100</span>
            </div>
            <p className="mt-1 text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              High intent pipeline
            </p>
          </div>
        </div>
      </section>

      {/* Main dashboard content */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentLeads />
        </div>

        <div>
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}
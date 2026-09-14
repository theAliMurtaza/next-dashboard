import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  DollarSign,
  PieChart,
  Radio,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db";

const channelSources = [
  { name: "Website Inbound", percentage: 42, count: 539, color: "bg-blue-600" },
  { name: "LinkedIn Campaigns", percentage: 28, count: 359, color: "bg-indigo-600" },
  { name: "Partner Referrals", percentage: 18, count: 231, color: "bg-emerald-600" },
  { name: "Outbound & Email", percentage: 12, count: 155, color: "bg-amber-600" },
];

const workflows = [
  {
    name: "AI Lead Scoring Engine",
    trigger: "POST /api/webhooks/n8n",
    runs: 1240,
    successRate: "99.4%",
    avgLatency: "320ms",
    status: "Healthy",
  },
  {
    name: "High-Priority Alert Dispatcher",
    trigger: "Score ≥ 80 Event",
    runs: 384,
    successRate: "99.8%",
    avgLatency: "180ms",
    status: "Healthy",
  },
  {
    name: "Daily Pipeline Health Digest",
    trigger: "Cron: 09:00 UTC",
    runs: 64,
    successRate: "100%",
    avgLatency: "540ms",
    status: "Healthy",
  },
  {
    name: "CRM Bi-directional Sync",
    trigger: "Hourly Webhook",
    runs: 154,
    successRate: "98.1%",
    avgLatency: "410ms",
    status: "Healthy",
  },
];

export default async function AnalyticsPage() {
  const n8nConfig = await db.getN8nConfig();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Analytics & Automation Telemetry
            </h1>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Live Feed
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time pipeline analytics, lead conversion metrics, and n8n execution telemetry.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Lead Conversion
            </p>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            28.4%
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ↑ +4.2% from last quarter
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Average Deal Size
            </p>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            $24,800
          </p>
          <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            ↑ +11.5% deal value expansion
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Pipeline Velocity
            </p>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            18.2 Days
          </p>
          <p className="mt-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
            ↓ 3.4 days faster closing
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              AI Scoring Precision
            </p>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            94.6%
          </p>
          <p className="mt-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            Based on 1,800+ validations
          </p>
        </div>
      </div>

      {/* Charts & Distributions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lead Channels Breakdown */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Lead Acquisition by Channel
              </h2>
              <p className="text-xs text-slate-400">
                Performance distribution across pipeline entrypoints
              </p>
            </div>
            <PieChart className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-6 space-y-4">
            {channelSources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {source.name}
                  </span>
                  <span className="text-slate-500">
                    {source.count} leads ({source.percentage}%)
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${source.color} transition-all duration-500`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Funnel Trajectory */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Conversion Funnel Velocity
              </h2>
              <p className="text-xs text-slate-400">
                Prospect stage progression through automated scoring
              </p>
            </div>
            <BarChart3 className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-6 space-y-3">
            {[
              { label: "1. Captured Leads", count: "1,284", pct: "100%", sub: "Inbound entries" },
              { label: "2. Initial Contact", count: "740", pct: "57.6%", sub: "Automated sequence" },
              { label: "3. AI Qualified", count: "384", pct: "29.9%", sub: "Score ≥ 70" },
              { label: "4. Deals Converted", count: "186", pct: "14.5%", sub: "Active customers" },
            ].map((step, idx) => (
              <div
                key={step.label}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-xs font-bold text-blue-600 dark:text-blue-400">
                    0{idx + 1}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-slate-400">{step.sub}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {step.count}
                  </p>
                  <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    {step.pct}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* n8n Automation Workflows Telemetry Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-200/80 p-6 dark:border-slate-800 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600 fill-blue-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                n8n Workflow Execution Telemetry
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Live monitoring of active orchestrations, latency, and success rates
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>Overall Success: {n8nConfig.successRate}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3.5">Workflow Name</th>
                <th className="px-6 py-3.5">Trigger Condition</th>
                <th className="px-6 py-3.5">Total Runs</th>
                <th className="px-6 py-3.5">Avg Latency</th>
                <th className="px-6 py-3.5">Success Rate</th>
                <th className="px-6 py-3.5 text-right">Node Health</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {workflows.map((wf) => (
                <tr
                  key={wf.name}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {wf.name}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">
                    {wf.trigger}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    {wf.runs.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {wf.avgLatency}
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {wf.successRate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {wf.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

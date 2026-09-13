import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Radio,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import { db } from "@/lib/db";
import { LeadStatusControl } from "./lead-status-control";

interface LeadPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LeadDetailsPage({ params }: LeadPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const lead = db.getLeadById(id);

  if (!lead) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Lead Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          The requested lead ID &quot;{id}&quot; does not exist or was deleted.
        </p>
        <Link
          href="/dashboard/leads"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads Pipeline
        </Link>
      </div>
    );
  }

  const scorePct = lead.score;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Bar */}
      <div>
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads Pipeline
        </Link>

        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                {lead.name}
              </h1>
              <LeadStatusBadge status={lead.status} />
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {lead.company} · Captured via {lead.source} on{" "}
              {new Date(lead.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Interactive Status Switcher & AI Rescore Button */}
          <LeadStatusControl leadId={lead.id} currentStatus={lead.status} />
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Lead Information, Notes, Activity */}
        <div className="space-y-6 lg:col-span-2">
          {/* General Information Card */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Prospect Details
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-3 dark:bg-slate-800/50">
                <Mail className="h-4 w-4 text-blue-500" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Email Address
                  </p>
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {lead.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-3 dark:bg-slate-800/50">
                <Phone className="h-4 w-4 text-blue-500" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Phone Number
                  </p>
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {lead.phone || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-3 dark:bg-slate-800/50">
                <Building className="h-4 w-4 text-blue-500" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Organization
                  </p>
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {lead.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-3 dark:bg-slate-800/50">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Estimated Deal Size
                  </p>
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    ${(lead.estimatedValue || 15000).toLocaleString()} USD
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {lead.tags && lead.tags.length > 0 && (
              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <Tag className="h-3.5 w-3.5 text-slate-400" />
                <div className="flex flex-wrap gap-1.5">
                  {lead.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Notes Card */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Requirement Notes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {lead.notes || "No detailed notes recorded for this prospect."}
            </p>
          </section>

          {/* Activity / Audit Trail */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Audit & Timeline
            </h2>

            <div className="mt-4 space-y-4 border-l-2 border-blue-200 pl-4 dark:border-blue-900">
              {lead.scoredAt && (
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    n8n AI Scoring Run Completed
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lead was evaluated by the automated LLM qualification node.
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {new Date(lead.scoredAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Lead Created
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Entered pipeline from {lead.source} channel.
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Aside: AI Lead Score Card & Automation Status */}
        <aside className="space-y-6">
          {/* AI Score Card */}
          <section className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white p-6 shadow-xs dark:border-blue-950 dark:from-blue-950/30 dark:to-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                AI Score Assessment
              </p>
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {lead.score}
              </span>
              <span className="text-sm font-medium text-slate-400">/ 100</span>
            </div>

            <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              {lead.score >= 80
                ? "High conversion probability"
                : lead.score >= 60
                ? "Moderate purchase intent"
                : "Early stage / low engagement"}
            </p>

            {/* Progress bar */}
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  lead.score >= 80
                    ? "bg-emerald-500"
                    : lead.score >= 60
                    ? "bg-blue-600"
                    : "bg-amber-500"
                }`}
                style={{ width: `${scorePct}%` }}
              />
            </div>

            {lead.scoringRationale && (
              <div className="mt-4 rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-blue-900/50 dark:bg-slate-800/60">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  AI Rationale:
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {lead.scoringRationale}
                </p>
              </div>
            )}
          </section>

          {/* Automation Node Info */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                n8n Automation Status
              </h3>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Webhook Node:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Pipeline Node:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  Lead-Qualification-v2
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Last Scored:</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {lead.scoredAt
                    ? new Date(lead.scoredAt).toLocaleDateString()
                    : "Pending"}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
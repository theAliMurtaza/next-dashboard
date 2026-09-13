import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { LeadStatusBadge } from "./lead-status-badge";

export function RecentLeads() {
  const leads = db.getLeads().slice(0, 5);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Prospects
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Latest leads scored by n8n workflow
          </p>
        </div>

        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {leads.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            No leads captured yet. Click &quot;Add Lead&quot; to begin.
          </div>
        ) : (
          leads.map((lead) => {
            const initials = lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2);

            return (
              <Link
                key={lead.id}
                href={`/dashboard/leads/${lead.id}`}
                className="group flex items-center justify-between gap-4 px-6 py-3.5 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {lead.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {lead.company} · {lead.source}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Score pill */}
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white">
                    <Sparkles className="h-3 w-3 text-blue-500" />
                    <span>{lead.score}</span>
                    <span className="text-[10px] font-normal text-slate-400">
                      /100
                    </span>
                  </div>

                  <LeadStatusBadge status={lead.status} size="sm" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
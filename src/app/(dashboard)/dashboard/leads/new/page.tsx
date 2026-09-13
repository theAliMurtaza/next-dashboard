import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LeadForm } from "@/components/leads/lead-form";

export default function NewLeadPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back button & page title */}
      <div>
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads Pipeline
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Create New Lead
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add prospect details. The n8n AI Lead Scoring engine will evaluate purchase intent automatically.
            </p>
          </div>

          <div className="hidden rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400 sm:block">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Embed Reusable Interactive Form */}
      <LeadForm />
    </div>
  );
}
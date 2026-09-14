import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  DollarSign,
  FolderKanban,
  Mail,
  Phone,
} from "lucide-react";
import { db } from "@/lib/db";

interface CustomerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerDetailsPage({
  params,
}: CustomerPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const customer = await db.getCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Header */}
      <div>
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </Link>

        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                {customer.name}
              </h1>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {customer.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Primary Contact: {customer.contact} · {customer.email}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contract Value
            </p>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {customer.value}
          </p>
          <p className="mt-1 text-xs text-slate-400">Annual recurring revenue</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Projects
            </p>
            <FolderKanban className="h-4 w-4 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {customer.projectsCount}
          </p>
          <p className="mt-1 text-xs text-slate-400">Integrated automations</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Client Relationship
            </p>
            <Calendar className="h-4 w-4 text-purple-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Since {customer.sinceYear}
          </p>
          <p className="mt-1 text-xs text-slate-400">Verified tier 1 partner</p>
        </div>
      </div>

      {/* Account Info Details */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Account Specifications
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">Legal Business Name</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
              {customer.company}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">Customer ID</p>
            <p className="mt-1 font-mono text-sm font-semibold text-slate-900 dark:text-white">
              {customer.id}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">Direct Contact Phone</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
              {customer.phone || "+1 (555) 000-0000"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">Assigned Account Lead</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
              Alex Morgan (Operations)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

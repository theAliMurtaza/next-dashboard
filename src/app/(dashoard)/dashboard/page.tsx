import Link from "next/link";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { StatCard } from "@/components/dashboard/stat-card";

export default function DashboardPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            {/* Page introduction */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Good morning, Admin 👋
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Here&apos;s what&apos;s happening with your business today.
                    </p>
                </div>

                <Link
                    href="/dashboard/leads/new"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    + Add Lead
                </Link>
            </section>

            {/* Stats */}
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Leads"
                    value="1,284"
                    change="12.5%"
                    description="vs last month"
                    icon="◎"
                />

                <StatCard
                    title="Qualified Leads"
                    value="384"
                    change="8.2%"
                    description="vs last month"
                    icon="🎯"
                />

                <StatCard
                    title="Customers"
                    value="186"
                    change="14.4%"
                    description="vs last month"
                    icon="♙"
                />

                <StatCard
                    title="Pending Tasks"
                    value="24"
                    change="5.1%"
                    description="vs last month"
                    icon="✓"
                    positive={false}
                />
            </section>

            {/* Automation overview */}
            <section className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">⚡</span>

                            <h2 className="font-semibold text-slate-900">
                                Automation System
                            </h2>
                        </div>

                        <p className="mt-1 text-sm text-slate-600">
                            Your n8n automation workflows are currently running normally.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        Operational
                    </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-4">
                        <p className="text-xs text-slate-500">Workflows</p>
                        <p className="mt-1 text-xl font-bold text-slate-900">6</p>
                    </div>

                    <div className="rounded-lg bg-white p-4">
                        <p className="text-xs text-slate-500">Executions Today</p>
                        <p className="mt-1 text-xl font-bold text-slate-900">142</p>
                    </div>

                    <div className="rounded-lg bg-white p-4">
                        <p className="text-xs text-slate-500">Success Rate</p>
                        <p className="mt-1 text-xl font-bold text-slate-900">98.6%</p>
                    </div>
                </div>
            </section>

            {/* Main dashboard content */}
            <section className="grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <RecentLeads />
                </div>

                <RecentActivity />
            </section>
        </div>
    );
}
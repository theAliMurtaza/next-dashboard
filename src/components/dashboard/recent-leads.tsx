import Link from "next/link";
import { LeadStatusBadge } from "./lead-status-badge";

const recentLeads = [
    {
        id: "lead-001",
        name: "John Smith",
        company: "TechVision",
        email: "john@techvision.com",
        score: 92,
        status: "Qualified" as const,
    },
    {
        id: "lead-002",
        name: "Sarah Johnson",
        company: "GrowthLabs",
        email: "sarah@growthlabs.com",
        score: 84,
        status: "Contacted" as const,
    },
    {
        id: "lead-003",
        name: "Michael Brown",
        company: "CloudWorks",
        email: "michael@cloudworks.com",
        score: 76,
        status: "New" as const,
    },
    {
        id: "lead-004",
        name: "Emily Davis",
        company: "DigitalFlow",
        email: "emily@digitalflow.com",
        score: 95,
        status: "Converted" as const,
    },
];

export function RecentLeads() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-slate-900">Recent Leads</h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Recently added prospects
                    </p>
                </div>

                <Link
                    href="/dashboard/leads"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    View all
                </Link>
            </div>

            <div className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                    <Link
                        key={lead.id}
                        href={`/dashboard/leads/${lead.id}`}
                        className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                                {lead.name
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-slate-900">
                                    {lead.name}
                                </p>

                                <p className="truncate text-xs text-slate-500">
                                    {lead.company}
                                </p>
                            </div>
                        </div>

                        <div className="hidden items-center gap-4 sm:flex">
                            <div className="text-right">
                                <p className="text-xs text-slate-400">AI Score</p>

                                <p className="font-semibold text-slate-900">
                                    {lead.score}
                                </p>
                            </div>

                            <LeadStatusBadge status={lead.status} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
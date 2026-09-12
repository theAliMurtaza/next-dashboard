import Link from "next/link";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";

const leads = [
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
    {
        id: "lead-005",
        name: "David Wilson",
        company: "ScaleUp",
        email: "david@scaleup.com",
        score: 68,
        status: "New" as const,
    },
];

export default function LeadsPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leads</h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage and qualify your business prospects.
                    </p>
                </div>

                <Link
                    href="/dashboard/leads/new"
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + Add Lead
                </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-200 p-5 md:flex-row">
                    <input
                        type="search"
                        placeholder="Search leads..."
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 md:w-80"
                    />

                    <select className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500">
                        <option>All statuses</option>
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Qualified</option>
                        <option>Converted</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-5 py-3">Lead</th>
                                <th className="px-5 py-3">Company</th>
                                <th className="px-5 py-3">AI Score</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {lead.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {lead.email}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        {lead.company}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="font-semibold text-slate-900">
                                            {lead.score}
                                        </span>
                                        <span className="text-slate-400">/100</span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <LeadStatusBadge status={lead.status} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <Link
                                            href={`/dashboard/leads/${lead.id}`}
                                            className="font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
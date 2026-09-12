import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";

interface LeadPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function LeadDetailsPage({
    params,
}: LeadPageProps) {
    const { id } = await params;

    if (!id) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <div>
                <Link
                    href="/dashboard/leads"
                    className="text-sm text-blue-600 hover:text-blue-700"
                >
                    ← Back to Leads
                </Link>

                <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            John Smith
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            TechVision · john@techvision.com
                        </p>
                    </div>

                    <LeadStatusBadge status="Qualified" />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900">
                            Lead Information
                        </h2>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <InfoItem label="Name" value="John Smith" />
                            <InfoItem label="Company" value="TechVision" />
                            <InfoItem
                                label="Email"
                                value="john@techvision.com"
                            />
                            <InfoItem label="Phone" value="+1 555 123 4567" />
                            <InfoItem label="Source" value="Website" />
                            <InfoItem label="Created" value="September 10, 2026" />
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900">
                            Notes
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            Interested in an AI-powered automation solution for their
                            sales operations. Requested a product demonstration.
                        </p>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900">
                            Activity
                        </h2>

                        <div className="mt-5 space-y-5">
                            <Activity
                                title="Lead qualified"
                                description="AI scoring workflow assigned a score of 92."
                                time="Today, 10:30 AM"
                            />

                            <Activity
                                title="Lead created"
                                description="Lead was added through the website."
                                time="Yesterday, 4:20 PM"
                            />
                        </div>
                    </section>
                </div>

                <aside className="space-y-6">
                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">AI Lead Score</p>

                        <p className="mt-2 text-5xl font-bold text-blue-600">
                            92
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            High-quality prospect
                        </p>

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full w-[92%] rounded-full bg-blue-600" />
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900">
                            Automation
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            n8n automation status
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            Lead scoring completed
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
}

function InfoItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm text-slate-800">{value}</p>
        </div>
    );
}

function Activity({
    title,
    description,
    time,
}: {
    title: string;
    description: string;
    time: string;
}) {
    return (
        <div className="border-l-2 border-blue-200 pl-4">
            <p className="text-sm font-medium text-slate-900">{title}</p>

            <p className="mt-1 text-sm text-slate-500">{description}</p>

            <p className="mt-1 text-xs text-slate-400">{time}</p>
        </div>
    );
}
import Link from "next/link";

interface CustomerPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CustomerDetailsPage({
    params,
}: CustomerPageProps) {
    const { id } = await params;

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <Link
                href="/dashboard/customers"
                className="text-sm text-blue-600 hover:text-blue-700"
            >
                ← Back to Customers
            </Link>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-400">Customer ID: {id}</p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    TechVision
                </h1>

                <p className="mt-1 text-slate-500">
                    John Smith · john@techvision.com
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                    <Info title="Customer Value" value="$24,500" />
                    <Info title="Projects" value="8" />
                    <Info title="Since" value="2025" />
                </div>
            </section>
        </div>
    );
}

function Info({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">{title}</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
                {value}
            </p>
        </div>
    );
}
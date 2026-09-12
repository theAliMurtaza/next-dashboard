import Link from "next/link";

interface TaskPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function TaskDetailsPage({
    params,
}: TaskPageProps) {
    const { id } = await params;

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <Link
                href="/dashboard/tasks"
                className="text-sm text-blue-600 hover:text-blue-700"
            >
                ← Back to Tasks
            </Link>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs text-slate-400">
                    Task ID: {id}
                </p>

                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                    Follow up with John Smith
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Contact the lead and discuss the automation requirements.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">Priority</p>
                        <p className="mt-1 font-semibold text-red-600">High</p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">Due Date</p>
                        <p className="mt-1 font-semibold text-slate-900">
                            Today
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">Status</p>
                        <p className="mt-1 font-semibold text-blue-600">
                            Pending
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
import Link from "next/link";

export default function NewLeadPage() {
    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <Link
                    href="/dashboard/leads"
                    className="text-sm text-blue-600 hover:text-blue-700"
                >
                    ← Back to Leads
                </Link>

                <h1 className="mt-4 text-2xl font-bold text-slate-900">
                    Add New Lead
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Add a new prospect to your sales pipeline.
                </p>
            </div>

            <form className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>

                        <input
                            name="name"
                            placeholder="John Smith"
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Company
                        </label>

                        <input
                            name="company"
                            placeholder="Company name"
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Phone
                        </label>

                        <input
                            name="phone"
                            placeholder="+92 300 1234567"
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Lead Source
                    </label>

                    <select
                        name="source"
                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                        <option>Website</option>
                        <option>Referral</option>
                        <option>LinkedIn</option>
                        <option>Email</option>
                        <option>Advertisement</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Notes
                    </label>

                    <textarea
                        name="notes"
                        rows={5}
                        placeholder="Add information about this lead..."
                        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                    <Link
                        href="/dashboard/leads"
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Create Lead
                    </button>
                </div>
            </form>
        </div>
    );
}
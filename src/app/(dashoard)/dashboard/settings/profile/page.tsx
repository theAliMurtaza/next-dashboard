export default function ProfileSettingsPage() {
    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Profile Settings
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Update your personal information.
                </p>
            </div>

            <form className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            First Name
                        </label>

                        <input
                            defaultValue="Admin"
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Last Name
                        </label>

                        <input
                            defaultValue="User"
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email
                    </label>

                    <input
                        type="email"
                        defaultValue="admin@opspilot.dev"
                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
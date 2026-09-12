const metrics = [
    {
        label: "Lead Conversion",
        value: "28.4%",
        change: "+4.2%",
    },
    {
        label: "Average Lead Score",
        value: "78.6",
        change: "+6.8%",
    },
    {
        label: "Task Completion",
        value: "91.2%",
        change: "+3.1%",
    },
    {
        label: "Customer Growth",
        value: "14.8%",
        change: "+2.6%",
    },
];

const sources = [
    {
        name: "Website",
        leads: 420,
        percentage: 42,
    },
    {
        name: "LinkedIn",
        leads: 280,
        percentage: 28,
    },
    {
        name: "Referral",
        leads: 180,
        percentage: 18,
    },
    {
        name: "Email",
        leads: 120,
        percentage: 12,
    },
];

export default function AnalyticsPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Analytics
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Understand your business performance.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div
                        key={metric.label}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm text-slate-500">{metric.label}</p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {metric.value}
                        </p>

                        <p className="mt-2 text-xs font-medium text-emerald-600">
                            ↑ {metric.change} this month
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="font-semibold text-slate-900">
                        Lead Sources
                    </h2>

                    <div className="mt-6 space-y-5">
                        {sources.map((source) => (
                            <div key={source.name}>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-slate-700">
                                        {source.name}
                                    </span>

                                    <span className="text-slate-500">
                                        {source.leads} leads
                                    </span>
                                </div>

                                <div className="mt-2 h-2 rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-blue-600"
                                        style={{
                                            width: `${source.percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="font-semibold text-slate-900">
                        Automation Performance
                    </h2>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Metric label="Executions" value="1,842" />
                        <Metric label="Successful" value="1,816" />
                        <Metric label="Failed" value="26" />
                        <Metric label="Success Rate" value="98.6%" />
                    </div>
                </section>
            </div>
        </div>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">{label}</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
                {value}
            </p>
        </div>
    );
}
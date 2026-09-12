const activities = [
    {
        title: "New lead created",
        description: "John Smith from TechVision",
        time: "10 minutes ago",
        icon: "👤",
    },
    {
        title: "Lead qualified",
        description: "Sarah Johnson received a score of 84",
        time: "32 minutes ago",
        icon: "🎯",
    },
    {
        title: "Task completed",
        description: "Follow up with CloudWorks",
        time: "1 hour ago",
        icon: "✓",
    },
    {
        title: "Automation triggered",
        description: "Daily lead scoring workflow completed",
        time: "2 hours ago",
        icon: "⚡",
    },
];

export function RecentActivity() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="font-semibold text-slate-900">
                    Recent Activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                    Latest activity across your workspace
                </p>
            </div>

            <div className="divide-y divide-slate-100">
                {activities.map((activity) => (
                    <div
                        key={`${activity.title}-${activity.time}`}
                        className="flex gap-3 px-5 py-4"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
                            {activity.icon}
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900">
                                {activity.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {activity.description}
                            </p>

                            <p className="mt-1 text-[11px] text-slate-400">
                                {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
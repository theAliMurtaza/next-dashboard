const tasks = [
    {
        title: "Follow up with John Smith",
        lead: "TechVision",
        priority: "High",
        due: "Today",
        completed: false,
    },
    {
        title: "Send proposal to GrowthLabs",
        lead: "GrowthLabs",
        priority: "High",
        due: "Today",
        completed: false,
    },
    {
        title: "Schedule CloudWorks demo",
        lead: "CloudWorks",
        priority: "Medium",
        due: "Tomorrow",
        completed: false,
    },
    {
        title: "Update DigitalFlow account",
        lead: "DigitalFlow",
        priority: "Low",
        due: "Sep 14",
        completed: true,
    },
];

export default function TasksPage() {
    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Tasks
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Keep track of your team's work.
                    </p>
                </div>

                <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                    + Add Task
                </button>
            </div>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.title}
                        className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <input
                            type="checkbox"
                            defaultChecked={task.completed}
                            className="h-4 w-4 rounded border-slate-300"
                        />

                        <div className="min-w-0 flex-1">
                            <p
                                className={`font-medium ${task.completed
                                    ? "text-slate-400 line-through"
                                    : "text-slate-900"
                                    }`}
                            >
                                {task.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {task.lead}
                            </p>
                        </div>

                        <span
                            className={`hidden rounded-full px-2.5 py-1 text-xs font-medium sm:inline-block ${task.priority === "High"
                                ? "bg-red-50 text-red-700"
                                : task.priority === "Medium"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                        >
                            {task.priority}
                        </span>

                        <span className="text-xs text-slate-500">
                            {task.due}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
import {
  Building,
  CheckSquare,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db";

export function RecentActivity() {
  const activities = db.getActivities().slice(0, 5);

  const getIcon = (type: string) => {
    switch (type) {
      case "lead":
        return <UserCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />;
      case "score":
        return <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "task":
        return <CheckSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "automation":
        return <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case "customer":
        return <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Zap className="h-4 w-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "lead":
        return "bg-sky-50 dark:bg-sky-950/50";
      case "score":
        return "bg-purple-50 dark:bg-purple-950/50";
      case "task":
        return "bg-emerald-50 dark:bg-emerald-950/50";
      case "automation":
        return "bg-amber-50 dark:bg-amber-950/50";
      case "customer":
        return "bg-blue-50 dark:bg-blue-950/50";
      default:
        return "bg-slate-100 dark:bg-slate-800";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200/80 px-6 py-4 dark:border-slate-800">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          System Activity
        </h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Live feed from CRM and n8n webhooks
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3.5 px-6 py-3.5 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${getIconBg(
                activity.iconType
              )}`}
            >
              {getIcon(activity.iconType)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {activity.title}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                {activity.description}
              </p>
              <p className="mt-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
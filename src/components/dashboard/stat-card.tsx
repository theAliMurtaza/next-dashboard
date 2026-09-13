import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  description?: string;
  icon?: React.ReactNode;
  positive?: boolean;
}

export function StatCard({
  title,
  value,
  change,
  description,
  icon,
  positive = true,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90">
      {/* Subtle background glow on hover */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/5 blur-xl transition-all duration-500 group-hover:bg-blue-500/10" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>

        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-blue-600 ring-1 ring-slate-900/5 transition-transform duration-300 group-hover:scale-105 dark:bg-slate-800/80 dark:text-blue-400 dark:ring-white/10">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        {change && (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold ${
              positive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
            }`}
          >
            {positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change}
          </span>
        )}

        {description && (
          <span className="text-slate-400 dark:text-slate-500">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
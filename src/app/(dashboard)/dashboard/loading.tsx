import { LoaderCircle } from "lucide-react";

export default function DashboardLoading() {
  return <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center"><div className="flex flex-col items-center gap-3 text-center"><LoaderCircle className="h-8 w-8 animate-spin text-blue-600" aria-label="Loading dashboard" /><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading dashboard…</p></div></div>;
}

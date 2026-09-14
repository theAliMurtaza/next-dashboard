import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Flag,
  User,
} from "lucide-react";
import { db } from "@/lib/db";

interface TaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TaskDetailsPage({ params }: TaskPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const task = await db.getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/dashboard/tasks"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tasks
      </Link>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-slate-400">Task ID: {task.id}</p>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              task.completed
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            }`}
          >
            {task.completed ? "Completed" : "Action Pending"}
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {task.title}
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {task.description || "Follow up on customer requirements and automation triggers."}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Flag className="h-3.5 w-3.5" />
              Priority
            </div>
            <p
              className={`mt-1 font-bold ${
                task.priority === "High"
                  ? "text-rose-600"
                  : task.priority === "Medium"
                  ? "text-amber-600"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {task.priority}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              Due Timeline
            </div>
            <p className="mt-1 font-bold text-slate-900 dark:text-white">
              {task.due}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <User className="h-3.5 w-3.5" />
              Assignee
            </div>
            <p className="mt-1 font-bold text-slate-900 dark:text-white">
              {task.assignedTo || "Alex Morgan"}
            </p>
          </div>
        </div>

        {task.lead && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div>
              <p className="text-xs text-slate-400">Related Prospect / Account</p>
              <p className="font-semibold text-slate-900 dark:text-white">
                {task.lead}
              </p>
            </div>
            {task.leadId && (
              <Link
                href={`/dashboard/leads/${task.leadId}`}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View Prospect Details →
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  CheckSquare,
  Clock,
  Filter,
  Plus,
  User,
} from "lucide-react";
import { toggleTaskAction } from "@/actions/lead.actions";
import { db } from "@/lib/db";
import { Task } from "@/types/lead";

export default function TasksPage() {
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [tasks, setTasks] = useState<Task[]>(() => db.getTasks());
  const [isPending, startTransition] = useTransition();

  const handleToggle = (taskId: string, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: updatedStatus } : t))
    );

    startTransition(async () => {
      await toggleTaskAction(taskId, updatedStatus);
    });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchPriority =
        filterPriority === "All" || t.priority === filterPriority;
      const matchStatus =
        filterStatus === "All" ||
        (filterStatus === "Completed" ? t.completed : !t.completed);
      return matchPriority && matchStatus;
    });
  }, [tasks, filterPriority, filterStatus]);

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Operational Tasks
            </h1>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {completedCount} of {tasks.length} Completed
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Keep track of your team&apos;s automated action items and sales follow-ups.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Filter by:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <CheckCircle2 className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
            <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              No tasks matching current filter
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center justify-between gap-4 rounded-2xl border p-4 shadow-2xs transition-all ${
                task.completed
                  ? "border-slate-200/60 bg-slate-50/50 opacity-70 dark:border-slate-800/60 dark:bg-slate-900/40"
                  : "border-slate-200/80 bg-white hover:border-blue-500/40 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id, task.completed)}
                  className="h-5 w-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold transition ${
                      task.completed
                        ? "text-slate-400 line-through dark:text-slate-500"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                    {task.lead && <span>Account: {task.lead}</span>}
                    {task.assignedTo && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.assignedTo}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    task.priority === "High"
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
                      : task.priority === "Medium"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {task.priority}
                </span>

                <span className="hidden items-center gap-1 text-xs text-slate-500 sm:flex">
                  <Clock className="h-3.5 w-3.5" />
                  {task.due}
                </span>

                <Link
                  href={`/dashboard/tasks/${task.id}`}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                  aria-label="View task details"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
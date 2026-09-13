import { Lead, LeadPriority, LeadStatus } from "@/types/lead";

export function getScoreCategory(score: number): {
  label: string;
  badgeClass: string;
  color: string;
} {
  if (score >= 85) {
    return {
      label: "Hot Prospect",
      badgeClass: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
      color: "#10b981",
    };
  }
  if (score >= 70) {
    return {
      label: "Qualified",
      badgeClass: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
      color: "#3b82f6",
    };
  }
  if (score >= 50) {
    return {
      label: "Medium Fit",
      badgeClass: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
      color: "#f59e0b",
    };
  }
  return {
    label: "Cold",
    badgeClass: "bg-slate-500/15 text-slate-400 border border-slate-500/20",
    color: "#64748b",
  };
}

export function getStatusStyle(status: LeadStatus): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  const norm = typeof status === "string" ? status.toLowerCase() : "new";
  switch (norm) {
    case "new":
      return {
        bg: "bg-sky-50 dark:bg-sky-950/40",
        text: "text-sky-700 dark:text-sky-300",
        border: "border-sky-200 dark:border-sky-800",
        dot: "bg-sky-500",
      };
    case "contacted":
      return {
        bg: "bg-amber-50 dark:bg-amber-950/40",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        dot: "bg-amber-500",
      };
    case "qualified":
      return {
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        text: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        dot: "bg-emerald-500",
      };
    case "converted":
      return {
        bg: "bg-purple-50 dark:bg-purple-950/40",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
        dot: "bg-purple-500",
      };
    case "lost":
    default:
      return {
        bg: "bg-rose-50 dark:bg-rose-950/40",
        text: "text-rose-700 dark:text-rose-300",
        border: "border-rose-200 dark:border-rose-800",
        dot: "bg-rose-500",
      };
  }
}

export function getPriorityStyle(priority: LeadPriority): string {
  switch (priority) {
    case "Critical":
    case "High":
      return "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800";
    case "Medium":
      return "text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800";
    case "Low":
    default:
      return "text-slate-600 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700";
  }
}

export function createInitialLead(data: Partial<Lead>): Lead {
  const now = new Date().toISOString();
  return {
    id: data.id ?? `lead-${Math.random().toString(36).substring(2, 9)}`,
    name: data.name ?? "",
    company: data.company ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    source: data.source ?? "Website",
    status: data.status ?? "New",
    score: data.score ?? 50,
    priority: data.priority ?? "Medium",
    notes: data.notes ?? "",
    estimatedValue: data.estimatedValue ?? 10000,
    createdAt: data.createdAt ?? now,
    updatedAt: now,
    tags: data.tags ?? ["Inbound"],
  };
}

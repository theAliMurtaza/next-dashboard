import { LeadStatus } from "@/types/lead";

interface LeadStatusBadgeProps {
  status: LeadStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  string,
  { bg: string; text: string; dot: string; border: string }
> = {
  new: {
    bg: "bg-sky-50 dark:bg-sky-950/40",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-200 dark:border-sky-800",
    dot: "bg-sky-500",
  },
  contacted: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  qualified: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  converted: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    dot: "bg-purple-500",
  },
  lost: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    dot: "bg-rose-500",
  },
};

export function LeadStatusBadge({ status, size = "md" }: LeadStatusBadgeProps) {
  const key = typeof status === "string" ? status.toLowerCase() : "new";
  const config = statusConfig[key] || statusConfig.new;

  const displayLabel =
    typeof status === "string"
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : "New";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors ${
        config.bg
      } ${config.text} ${config.border} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {displayLabel}
    </span>
  );
}
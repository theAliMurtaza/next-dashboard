"use client";

import { useState, useTransition } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { rescoreLeadAction, updateLeadStatusAction } from "@/actions/lead.actions";
import { LeadStatus } from "@/types/lead";

interface LeadStatusControlProps {
  leadId: string;
  currentStatus: LeadStatus;
}

export function LeadStatusControl({
  leadId,
  currentStatus,
}: LeadStatusControlProps) {
  const [status, setStatus] = useState<LeadStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [isRescoring, setIsRescoring] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleStatusChange = (newStatus: LeadStatus) => {
    setStatus(newStatus);
    startTransition(async () => {
      const res = await updateLeadStatusAction(leadId, newStatus);
      if (res.success) {
        setFeedback(`Status updated to ${newStatus}`);
        setTimeout(() => setFeedback(null), 3000);
      }
    });
  };

  const handleRescore = async () => {
    setIsRescoring(true);
    setFeedback(null);
    try {
      const res = await rescoreLeadAction(leadId);
      if (res.success) {
        setFeedback(res.message || "Rescored successfully!");
        setTimeout(() => setFeedback(null), 3000);
      }
    } finally {
      setIsRescoring(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {feedback && (
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in">
          ✓ {feedback}
        </span>
      )}

      {/* Change Status Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-slate-500">Status:</label>
        <select
          value={status}
          disabled={isPending}
          onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Run n8n AI Scoring Button */}
      <button
        type="button"
        onClick={handleRescore}
        disabled={isRescoring}
        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRescoring ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Evaluating...
          </>
        ) : (
          <>
            <Sparkles className="h-3.5 w-3.5" />
            Re-score with n8n AI
          </>
        )}
      </button>
    </div>
  );
}

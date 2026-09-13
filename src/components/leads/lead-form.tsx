"use client";

import { useRef, useState, useTransition } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { createLeadAction } from "@/actions/lead.actions";

type FieldError = Record<string, string>;

const SOURCES = [
  { value: "Website", label: "Website" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Referral", label: "Referral" },
  { value: "Email", label: "Cold Email" },
  { value: "Advertisement", label: "Advertisement" },
  { value: "Event", label: "Event / Conference" },
  { value: "Other", label: "Other" },
];

const STATUSES = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Converted", label: "Converted" },
  { value: "Lost", label: "Lost" },
];

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function InputField({
  id,
  name,
  label,
  icon,
  error,
  type = "text",
  placeholder,
  required,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          {icon}
        </div>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
            error
              ? "border-rose-400 focus:border-rose-400 focus:ring-rose-500/20 dark:border-rose-500"
              : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
          }`}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
  required?: boolean;
}

function SelectField({
  id,
  name,
  label,
  icon,
  options,
  defaultValue,
  error,
  required,
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          {icon}
        </div>
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-10 text-sm text-slate-900 shadow-xs outline-none transition focus:ring-2 dark:bg-slate-900 dark:text-white ${
            error
              ? "border-rose-400 focus:border-rose-400 focus:ring-rose-500/20 dark:border-rose-500"
              : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
          }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

  async function handleSubmit(formData: FormData) {
    setResult(null);
    setFieldErrors({});

    startTransition(async () => {
      const res = await createLeadAction(formData);

      if (res.success) {
        setResult({ success: true, message: res.message || "Lead created successfully!" });
        formRef.current?.reset();
      } else {
        setResult({ success: false, message: res.message || "Something went wrong." });
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      {/* AI Scoring Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-xs">
          <Zap className="h-3.5 w-3.5 fill-white text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">
            AI Scoring Enabled
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-blue-700/80 dark:text-blue-400/80">
            After creation, n8n will automatically score this lead and trigger
            priority alerts if the score is ≥ 80.
          </p>
        </div>
      </div>

      {/* Result Banner */}
      {result && (
        <div
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
            result.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300"
              : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {result.message}
        </div>
      )}

      {/* Contact Information */}
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Contact Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="name"
            name="name"
            label="Full Name"
            icon={<User className="h-4 w-4" />}
            placeholder="John Smith"
            required
            error={fieldErrors.name}
          />
          <InputField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            placeholder="john@company.com"
            required
            error={fieldErrors.email}
          />
          <InputField
            id="company"
            name="company"
            label="Company"
            icon={<Building2 className="h-4 w-4" />}
            placeholder="Acme Corporation"
            required
            error={fieldErrors.company}
          />
          <InputField
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            icon={<Phone className="h-4 w-4" />}
            placeholder="+1 (555) 000-0000"
            error={fieldErrors.phone}
          />
        </div>
      </div>

      {/* Lead Details */}
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Lead Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="source"
            name="source"
            label="Lead Source"
            icon={<Sparkles className="h-4 w-4" />}
            options={SOURCES}
            required
            error={fieldErrors.source}
          />
          <SelectField
            id="status"
            name="status"
            label="Initial Status"
            icon={<ChevronDown className="h-4 w-4" />}
            options={STATUSES}
            defaultValue="New"
            error={fieldErrors.status}
          />
          <div className="sm:col-span-2">
            <label
              htmlFor="estimatedValue"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Estimated Value ($)
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm font-semibold">
                $
              </div>
              <input
                id="estimatedValue"
                name="estimatedValue"
                type="number"
                min={0}
                defaultValue={15000}
                placeholder="15000"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Notes
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute left-3.5 top-3 text-slate-400">
            <MessageSquare className="h-4 w-4" />
          </div>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Additional context, pain points, or requirements…"
            className={`w-full resize-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
              fieldErrors.notes
                ? "border-rose-400 focus:border-rose-400 focus:ring-rose-500/20"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700"
            }`}
          />
        </div>
        {fieldErrors.notes && (
          <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {fieldErrors.notes}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        id="submit-lead-btn"
        type="submit"
        disabled={isPending}
        className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating &amp; AI Scoring…
          </>
        ) : (
          <>
            <Zap className="h-4 w-4 fill-white" />
            Create Lead &amp; Trigger AI Score
          </>
        )}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </form>
  );
}
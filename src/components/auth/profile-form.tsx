"use client";

import { useState, useTransition } from "react";
import { Save } from "lucide-react";
import { updateProfileAction } from "@/actions/auth.actions";
import type { User } from "@/models/user.model";

export function ProfileForm({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function submit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await updateProfileAction(formData);
      setMessage(result.message ?? (result.success ? "Profile saved." : "Unable to save profile."));
    });
  }

  return <form action={submit} className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-8"><div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-md shadow-blue-500/20">{user.initials}</div><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h2><p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p></div></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" name="name" defaultValue={user.name} required /><Field label="Email address" name="email" defaultValue={user.email} type="email" readOnly /><Field label="Job title" name="title" defaultValue={user.title} required /><Field label="Organization" name="organization" defaultValue={user.organization} required /></div><div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-slate-800"><p aria-live="polite" className="text-xs text-slate-500 dark:text-slate-400">{message}</p><button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-60"><Save className="h-3.5 w-3.5" />{isPending ? "Saving…" : "Save Profile"}</button></div></form>;
}

function Field({ label, name, defaultValue, type = "text", required, readOnly }: { label: string; name: string; defaultValue: string; type?: string; required?: boolean; readOnly?: boolean }) {
  return <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">{label}<input name={name} type={type} defaultValue={defaultValue} required={required} readOnly={readOnly} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white read-only:cursor-not-allowed read-only:opacity-70" /></label>;
}

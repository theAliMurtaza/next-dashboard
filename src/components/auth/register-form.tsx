"use client";

import { useState, useTransition } from "react";
import { registerAction } from "@/actions/auth.actions";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await registerAction(formData);
      if (result && !result.success) {
        setError(result.message || "Could not create account.");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="reg-comp-name" className="block text-xs font-semibold text-slate-300">
          Full Name
        </label>
        <input
          id="reg-comp-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="e.g. Jane Doe"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
        />
      </div>

      <div>
        <label htmlFor="reg-comp-email" className="block text-xs font-semibold text-slate-300">
          Email address
        </label>
        <input
          id="reg-comp-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@company.com"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
        />
      </div>

      <div>
        <label htmlFor="reg-comp-password" className="block text-xs font-semibold text-slate-300">
          Password
        </label>
        <input
          id="reg-comp-password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
      >
        {isPending ? "Creating account..." : "Get Started with OpsPilot"}
      </button>
    </form>
  );
}

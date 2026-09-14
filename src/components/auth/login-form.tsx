"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth.actions";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result && !result.success) {
        setError(result.message || "Could not sign in.");
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
        <label htmlFor="login-comp-email" className="block text-xs font-semibold text-slate-300">
          Email address
        </label>
        <input
          id="login-comp-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="login-comp-password" className="block text-xs font-semibold text-slate-300">
            Password
          </label>
          <Link
            href="/forget-password"
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Forgot?
          </Link>
        </div>
        <input
          id="login-comp-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign In to OpsPilot"}
      </button>
    </form>
  );
}

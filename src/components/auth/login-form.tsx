"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@opspilot.dev");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-comp-email" className="block text-xs font-semibold text-slate-300">
          Email address
        </label>
        <input
          id="login-comp-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@opspilot.dev"
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
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
      >
        {isLoading ? "Signing in..." : "Sign In to OpsPilot"}
      </button>
    </form>
  );
}

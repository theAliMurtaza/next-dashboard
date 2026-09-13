import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 ring-1 ring-blue-500/20">
          <Sparkles className="h-7 w-7 text-blue-500" />
        </div>

        <p className="mt-6 text-7xl font-extrabold tracking-tight text-blue-500">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          The page you are looking for doesn&apos;t exist or has been moved to a new route.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
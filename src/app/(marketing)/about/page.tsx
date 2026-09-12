import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            Ops<span className="text-blue-500">Pilot</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-300 hover:text-white transition">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 transition"
            >
              Go to Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About <span className="text-blue-500">OpsPilot</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-400">
          OpsPilot bridges the gap between modern CRM data pipelines, AI-driven lead scoring heuristics, and automated event workflows orchestrated via n8n.
        </p>
      </section>

      {/* Mission / Pillars */}
      <section className="mx-auto max-w-5xl px-6 pb-24 grid gap-8 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-3xl mb-3">⚡</div>
          <h2 className="text-lg font-semibold mb-2">Automate Everything</h2>
          <p className="text-sm text-slate-400">
            Eliminate repetitive copy-pasting between CRMs and communication channels.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-3xl mb-3">🎯</div>
          <h2 className="text-lg font-semibold mb-2">Predictive AI Scoring</h2>
          <p className="text-sm text-slate-400">
            Detect purchase readiness automatically before your competitors reach out.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-3xl mb-3">📊</div>
          <h2 className="text-lg font-semibold mb-2">Total Visibility</h2>
          <p className="text-sm text-slate-400">
            Gain immediate insight into team tasks, pipeline bottlenecks, and revenue growth.
          </p>
        </div>
      </section>
    </main>
  );
}

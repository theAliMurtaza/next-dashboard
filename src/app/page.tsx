import Link from "next/link";

const features = [
  {
    title: "Lead Management",
    description:
      "Capture, organize, score, and manage your business leads from one place.",
    icon: "🎯",
  },
  {
    title: "AI Lead Scoring",
    description:
      "Automatically evaluate leads and identify the prospects that deserve attention.",
    icon: "🤖",
  },
  {
    title: "Workflow Automation",
    description:
      "Connect your business processes with automated workflows powered by n8n.",
    icon: "⚡",
  },
  {
    title: "Business Analytics",
    description:
      "Understand your pipeline, conversions, tasks, and business performance.",
    icon: "📊",
  },
];

const stats = [
  {
    value: "10K+",
    label: "Leads Managed",
  },
  {
    value: "35%",
    label: "Avg. Conversion",
  },
  {
    value: "24/7",
    label: "Automation",
  },
  {
    value: "99.9%",
    label: "Platform Uptime",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            Ops<span className="text-blue-500">Pilot</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              How It Works
            </a>

            <Link
              href="/login"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium transition hover:bg-blue-500"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:pb-32 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              AI-powered business operations
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Turn your business operations into an{" "}
              <span className="text-blue-500">automated system.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              OpsPilot helps teams manage leads, customers, tasks and
              analytics while automating repetitive business workflows with
              AI and n8n.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-lg bg-blue-600 px-7 py-3.5 font-medium transition hover:bg-blue-500"
              >
                Open Dashboard
              </Link>

              <a
                href="#features"
                className="rounded-lg border border-white/10 px-7 py-3.5 font-medium transition hover:bg-white/5"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-10 text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Platform
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Everything you need to run your operations.
            </h2>

            <p className="mt-4 text-slate-400">
              Manage your business processes while letting automation handle
              repetitive work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-blue-500/40"
              >
                <div className="text-3xl">{feature.icon}</div>

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-white/[0.02] py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              How it works
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              From data to automated action.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Capture",
                description:
                  "Collect leads, customers and operational data through your application.",
              },
              {
                number: "02",
                title: "Analyze",
                description:
                  "Use your application and AI workflows to understand your business data.",
              },
              {
                number: "03",
                title: "Automate",
                description:
                  "Let n8n trigger notifications, follow-ups, reports and other workflows.",
              },
            ].map((step) => (
              <div key={step.number} className="relative">
                <span className="text-5xl font-bold text-blue-500/30">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Ready to automate your operations?
          </h2>

          <p className="mt-4 text-slate-400">
            Start managing your leads and business workflows from one
            intelligent platform.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-7 py-3.5 font-medium transition hover:bg-blue-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} OpsPilot. All rights reserved.
          </p>

          <p>AI-powered business operations.</p>
        </div>
      </footer>
    </main>
  );
}
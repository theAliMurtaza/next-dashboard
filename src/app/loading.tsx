import { LoaderCircle, Sparkles } from "lucide-react";

export default function Loading() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white"><div className="flex flex-col items-center gap-4 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-400/20"><Sparkles className="h-6 w-6 text-blue-400" /></div><LoaderCircle className="h-7 w-7 animate-spin text-blue-400" aria-label="Loading" /><p className="text-sm font-medium text-slate-300">Loading your workspace…</p></div></main>;
}

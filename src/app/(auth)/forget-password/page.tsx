import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-white">Reset password</h1>
        <p className="mt-1 text-xs text-slate-400">
          Enter your email address to receive password recovery instructions
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="reset-email" className="block text-xs font-semibold text-slate-300">
            Email address
          </label>
          <input
            id="reset-email"
            type="email"
            required
            placeholder="admin@opspilot.dev"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Send Reset Link
        </button>

        <div className="text-center text-xs text-slate-400">
          Remembered password?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

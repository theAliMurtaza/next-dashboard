import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <div>
            <div className="mb-8 text-center">
                <Link
                    href="/"
                    className="text-2xl font-bold text-white"
                >
                    Ops<span className="text-blue-500">Pilot</span>
                </Link>

                <h1 className="mt-8 text-3xl font-bold text-white">
                    Welcome back
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Sign in to continue to your dashboard.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
                <LoginForm />
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-blue-500 hover:text-blue-400"
                >
                    Create one
                </Link>
            </p>
        </div>
    );
}
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
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
                    Create your account
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Start managing your business operations.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
                <RegisterForm />
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-blue-500 hover:text-blue-400"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}
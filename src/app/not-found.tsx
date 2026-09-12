import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
            <div className="text-center">
                <p className="text-7xl font-bold text-blue-500">404</p>

                <h1 className="mt-6 text-3xl font-bold">
                    Page not found
                </h1>

                <p className="mt-3 text-slate-400">
                    The page you are looking for doesn't exist.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium hover:bg-blue-500"
                >
                    Back to home
                </Link>
            </div>
        </main>
    );
}
import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { AuthLayout } from "@/components/ui/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to continue building your career story."
    >
      <form className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-ink">
            Email address
          </span>
          <span className="flex items-center gap-3 rounded-xl border border-line px-4 transition-colors focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50">
            <Mail className="size-4 text-ink-faint" />
            <input
              className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-ink-faint"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              required
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-2 flex items-center justify-between text-sm font-bold text-ink">
            Password{" "}
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-700"
              href="#forgot-password"
            >
              Forgot password?
            </Link>
          </span>
          <span className="flex items-center gap-3 rounded-xl border border-line px-4 transition-colors focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50">
            <LockKeyhole className="size-4 text-ink-faint" />
            <input
              className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-ink-faint"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              required
            />
          </span>
        </label>
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,0.24)] transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_14px_28px_rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          type="submit"
        >
          Login <ArrowRight className="size-4" />
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-ink-soft">
        New to JobPortal?{" "}
        <Link
          className="font-bold text-indigo-600 hover:text-indigo-700"
          href="/register"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}

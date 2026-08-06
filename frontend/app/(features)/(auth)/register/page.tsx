import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { AuthLayout } from "@/components/ui/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Join JobPortal and take the next step with confidence."
      brandTitle="The work you want is waiting for you."
      brandDescription="Create your profile once, then let the right opportunities find their way to you."
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
          <span className="mb-2 block text-sm font-bold text-ink">
            Password
          </span>
          <span className="flex items-center gap-3 rounded-xl border border-line px-4 transition-colors focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50">
            <LockKeyhole className="size-4 text-ink-faint" />
            <input
              className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-ink-faint"
              placeholder="Create a secure password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </span>
          <span className="mt-2 block text-xs text-ink-faint">
            Use at least 8 characters.
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-ink">
            I want to join as a
          </span>
          <span className="relative block">
            <select
              className="w-full appearance-none rounded-xl border border-line bg-paper px-4 py-3.5 pr-11 text-sm font-medium text-ink outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              defaultValue="candidate"
              name="role"
            >
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
            />
          </span>
        </label>
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,0.24)] transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_14px_28px_rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          type="submit"
        >
          Register <ArrowRight className="size-4" />
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          className="font-bold text-indigo-600 hover:text-indigo-700"
          href="/login"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

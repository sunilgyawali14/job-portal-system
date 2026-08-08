"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronDown, LockKeyhole, Mail, Loader2, AlertCircle } from "lucide-react";
import { AuthLayout } from "@/components/ui/AuthLayout";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.map((err: { message: string }) => err.message).join(", "));
        }
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      // Registration successful -> redirect to login page with query param
      setRegisteredSuccess(true);
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Join JobPortal and take the next step with confidence."
      brandTitle="The work you want is waiting for you."
      brandDescription="Create your profile once, then let the right opportunities find their way to you."
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && (
          <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            <AlertCircle className="size-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </span>
          <span className="mt-2 block text-xs text-ink-faint">
            Use at least 8 characters with 1 uppercase, 1 lowercase, 1 number & 1 special character.
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-ink">
            I want to join as a
          </span>
          <span className="relative block">
            <select
              className="w-full appearance-none rounded-xl border border-line bg-paper px-4 py-3.5 pr-11 text-sm font-medium text-ink outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              name="role"
            >
              <option value="CANDIDATE">Candidate</option>
              <option value="RECRUITER">Recruiter</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
            />
          </span>
        </label>
        <button
          disabled={loading || registeredSuccess}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,0.24)] transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_14px_28px_rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Registering...
            </>
          ) : (
            <>
              Register <ArrowRight className="size-4" />
            </>
          )}
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

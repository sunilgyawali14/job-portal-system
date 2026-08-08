"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/ui/AuthLayout";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isJustRegistered = searchParams.get("registered") === "true";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.map((err: { message: string }) => err.message).join(", "));
        }
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }

      // Save user context & redirect to home
      if (data.data && data.data.user) {
        loginUser(data.data.user, data.data.accessToken || "");
      }
      router.push("/?loggedin=true");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to continue building your career story."
      brandTitle="Your next great role is closer than you think."
      brandDescription="Pick up where you left off, revisit saved roles, and keep the momentum going."
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {isJustRegistered && (
          <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="size-5 shrink-0" />
            <span>Account created successfully! Please log in to continue.</span>
          </div>
        )}

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </span>
        </label>
        <button
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,0.24)] transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_14px_28px_rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Logging in...
            </>
          ) : (
            <>
              Login <ArrowRight className="size-4" />
            </>
          )}
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

"use client";

import { ArrowRight, MapPin, Search, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function Hero() {
  const { user, logoutUser } = useAuth();

  return (
    <section
      className="grain-canvas relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/40 px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28"
      id="home"
    >
      <div className="mx-auto max-w-5xl text-center">
        {user ? (
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-indigo-200 bg-white/80 px-6 py-3.5 shadow-lg backdrop-blur-md">
            <Sparkles className="size-5 text-indigo-500 animate-pulse" />
            <span className="text-base font-bold text-ink">
              Welcome back, <span className="text-indigo-600">{user.email}</span>! 👋
            </span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
              {user.role}
            </span>
            <button
              onClick={() => logoutUser()}
              className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 underline"
            >
              <LogOut className="size-3" /> Logout
            </button>
          </div>
        ) : (
          <span className="inline-flex rounded-full border border-indigo-100 bg-paper px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm">
            ✦ Over 10,000 new opportunities this week
          </span>
        )}

        <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-bold tracking-[-0.065em] text-ink sm:text-6xl lg:text-7xl">
          Find a job you’ll{" "}
          <span className="text-indigo-500">love to wake up for.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
          Discover roles at companies that value your skills, your ideas, and
          your next big move.
        </p>
        <form
          className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-2xl border border-line bg-paper p-3 shadow-[0_18px_45px_rgba(74,71,232,0.14)] md:grid-cols-[1.2fr_1fr_auto]"
          action="#jobs"
        >
          <label className="flex items-center gap-3 rounded-xl px-3 text-left">
            <Search className="size-5 shrink-0 text-indigo-500" />
            <span className="sr-only">Job title or keyword</span>
            <input
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-ink-faint"
              placeholder="Job title, skill, or keyword"
              type="search"
            />
          </label>
          <label className="flex items-center gap-3 border-t border-line px-3 text-left md:border-l md:border-t-0">
            <MapPin className="size-5 shrink-0 text-indigo-500" />
            <span className="sr-only">Location</span>
            <input
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-ink-faint"
              placeholder="City, state, or remote"
              type="search"
            />
          </label>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-600 hover:shadow-lg"
            type="submit"
          >
            Search jobs <ArrowRight className="size-4" />
          </button>
        </form>
        <p className="mt-4 text-xs text-ink-faint">
          Popular: Design · Engineering · Marketing · Remote
        </p>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { JobPortalLogo } from "@/components/ui/Logo";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <main className="grain-canvas flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-paper to-blue-50 px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><JobPortalLogo /></div>
        <section className="rounded-3xl border border-line bg-paper p-6 shadow-[0_20px_55px_rgba(37,99,235,0.14)] sm:p-8">
          <header className="text-center"><h1 className="font-display text-3xl font-bold tracking-[-0.05em] text-ink">{title}</h1><p className="mt-3 text-sm leading-6 text-ink-soft">{description}</p></header>
          {children}
        </section>
        <p className="mt-6 text-center text-xs text-ink-faint">By continuing, you agree to our <Link className="underline hover:text-indigo-600" href="#terms">Terms of Service</Link> and <Link className="underline hover:text-indigo-600" href="#privacy">Privacy Policy</Link>.</p>
      </div>
    </main>
  );
}

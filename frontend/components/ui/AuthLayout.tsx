import type { ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { JobPortalLogo } from "@/components/ui/Logo";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  brandTitle: string;
  brandDescription: string;
};

export function AuthLayout({ children, title, description, brandTitle, brandDescription }: AuthLayoutProps) {
  return (
    <main className="grain-canvas flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-paper to-blue-50 p-4 sm:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-paper shadow-[0_24px_65px_rgba(37,99,235,0.16)] lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 p-7 text-white sm:p-10">
          <div className="absolute -right-24 -top-24 size-72 rounded-full border-[24px] border-white/10" />
          <div className="absolute -bottom-28 -left-24 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex min-h-72 flex-col lg:min-h-[38rem]">
            <JobPortalLogo light />
            <div className="my-auto max-w-md py-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white/90"><Sparkles className="size-3.5" /> Find your better fit</span>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl">{brandTitle}</h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-indigo-50 sm:text-base">{brandDescription}</p>
            </div>
            <div className="mt-5 flex items-center gap-3 text-xs text-indigo-50"><div className="flex -space-x-2"><span className="grid size-7 place-items-center rounded-full border-2 border-indigo-500 bg-amber-100 text-[9px] font-bold text-amber">AM</span><span className="grid size-7 place-items-center rounded-full border-2 border-indigo-500 bg-mint-100 text-[9px] font-bold text-mint">SK</span><span className="grid size-7 place-items-center rounded-full border-2 border-indigo-500 bg-indigo-100 text-[9px] font-bold text-indigo-600">JL</span></div><span className="inline-flex items-center gap-1"><CheckCircle2 className="size-3.5" /> Trusted by 120k+ professionals</span></div>
          </div>
        </aside>
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <header><p className="text-sm font-bold uppercase tracking-[0.14em] text-indigo-600">JobPortal account</p><h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-ink">{title}</h1><p className="mt-3 text-sm leading-6 text-ink-soft">{description}</p></header>
            {children}
            <p className="mt-6 text-center text-xs text-ink-faint">By continuing, you agree to our <Link className="underline hover:text-indigo-600" href="#terms">Terms of Service</Link> and <Link className="underline hover:text-indigo-600" href="#privacy">Privacy Policy</Link>.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

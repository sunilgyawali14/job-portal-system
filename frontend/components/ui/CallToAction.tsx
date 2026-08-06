import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-indigo-600 px-6 py-14 text-center text-white shadow-[0_20px_50px_rgba(53,56,205,0.25)] sm:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-100">
          Your next chapter is waiting
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-[-0.05em] sm:text-5xl">
          Ready to find work that fits?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
          Join thousands of professionals finding more meaningful careers with
          JobPortal.
        </p>
        <Link
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 transition-transform hover:-translate-y-0.5"
          href="#signup"
        >
          Create your free account <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

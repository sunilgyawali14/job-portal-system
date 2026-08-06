import { ArrowRight, Bookmark, Building2, MapPin } from "lucide-react";
import Link from "next/link";

const jobs = [
  { title: "Senior Product Designer", company: "Notion", location: "San Francisco, CA", type: "Full-time", initials: "N", color: "bg-slate-900" },
  { title: "Frontend Developer", company: "Webflow", location: "Remote", type: "Full-time", initials: "W", color: "bg-blue-500" },
  { title: "Product Marketing Manager", company: "Figma", location: "New York, NY", type: "Full-time", initials: "F", color: "bg-fuchsia-500" },
];

export function FeatureJobs() {
  return (
    <section className="bg-canvas py-20 sm:py-28" id="jobs">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Featured opportunities</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-ink sm:text-4xl">Jobs worth getting excited about.</h2></div>
          <Link className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700" href="#all-jobs">View all jobs <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {jobs.map((job) => <article className="group rounded-2xl border border-line bg-paper p-6 shadow-[0_8px_30px_rgba(31,35,68,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(31,35,68,0.1)]" key={job.title}>
            <div className="flex items-start justify-between"><div className={`grid size-12 place-items-center rounded-xl ${job.color} text-lg font-bold text-white`}>{job.initials}</div><button aria-label={`Save ${job.title}`} className="grid size-10 place-items-center rounded-lg border border-line text-ink-faint transition-colors hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"><Bookmark className="size-4" /></button></div>
            <h3 className="mt-6 text-lg font-bold text-ink">{job.title}</h3><p className="mt-1 text-sm text-ink-soft">{job.company}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-ink-soft"><span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1"><MapPin className="size-3" />{job.location}</span><span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1"><Building2 className="size-3" />{job.type}</span></div>
            <Link className="mt-6 flex items-center justify-between border-t border-line pt-5 text-sm font-bold text-indigo-600" href="#apply">View job <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
          </article>)}
        </div>
      </div>
    </section>
  );
}

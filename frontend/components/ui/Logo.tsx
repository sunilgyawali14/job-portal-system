import { BriefcaseBusiness, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type JobPortalLogoProps = {
  compact?: boolean;
  light?: boolean;
};

export function JobPortalLogo({ compact = false, light = false }: JobPortalLogoProps) {
  return (
    <Link
      aria-label="JobPortal home"
      className="group inline-flex items-center gap-2.5 rounded-xl outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      href="/"
    >
      <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet text-white shadow-[0_8px_18px_rgba(74,71,232,0.24)]">
        <BriefcaseBusiness aria-hidden="true" className="size-5" strokeWidth={2.4} />
        <ArrowUpRight aria-hidden="true" className="absolute -right-1 -top-1 size-4 rounded-full bg-paper p-0.5 text-indigo-500" strokeWidth={3} />
      </span>
      {!compact && (
        <span className={`font-display text-xl font-bold tracking-[-0.06em] ${light ? "text-white" : "text-ink"}`}>
          JOB<span className={light ? "text-blue-100" : "text-indigo-500"}>PORTAL</span>
        </span>
      )}
    </Link>
  );
}

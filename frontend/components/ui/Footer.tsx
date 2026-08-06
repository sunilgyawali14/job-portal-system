import Link from "next/link";
import { JobPortalLogo } from "@/components/ui/Logo";

const footerLinks = {
  Product: ["Find jobs", "Browse companies", "Career resources"],
  Company: ["About us", "Contact", "Privacy"],
  Support: ["Help center", "Terms of service", "Accessibility"],
};

export function Footer() {
  return (
    <footer className="bg-indigo-900 py-14 text-indigo-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <JobPortalLogo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-indigo-100/70">
              Helping ambitious people find work that moves them forward.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-sm font-bold text-white">{title}</h2>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      className="text-sm text-indigo-100/70 transition-colors hover:text-white"
                      href="#"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-indigo-100/60">
          <p>© 2026 JobPortal. All rights reserved.</p>
          <p>Built to make your next step easier.</p>
        </div>
      </div>
    </footer>
  );
}

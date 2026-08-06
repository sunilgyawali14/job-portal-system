"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { JobPortalLogo } from "@/components/ui/Logo";

const navigation = [
  { href: "#home", label: "Home" },
  { href: "#jobs", label: "Jobs" },
  { href: "#companies", label: "Companies" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <JobPortalLogo />

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:bg-indigo-50 focus-visible:text-indigo-600 focus-visible:outline-none"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link className="rounded-lg px-4 py-2.5 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" href="/login">
            Login
          </Link>
          <Link className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(74,71,232,0.24)] transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_12px_24px_rgba(74,71,232,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2" href="/register">
            Register
          </Link>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="grid size-11 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-paper px-5 py-4 shadow-xl lg:hidden" id="mobile-navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link className="rounded-lg px-3 py-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-indigo-50 hover:text-indigo-600" href={item.href} key={item.label} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-4">
              <Link className="rounded-lg border border-indigo-100 px-4 py-2.5 text-center text-sm font-bold text-indigo-600" href="/login" onClick={closeMenu}>Login</Link>
              <Link className="rounded-lg bg-indigo-500 px-4 py-2.5 text-center text-sm font-bold text-white" href="/register" onClick={closeMenu}>Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

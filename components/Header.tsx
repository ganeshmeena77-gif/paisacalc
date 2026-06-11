"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator, ChevronDown, Menu, X } from "lucide-react";
import { calculators, SITE_NAME } from "@/lib/calculatorMeta";

const categories = Array.from(new Set(calculators.map((c) => c.category)));

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcMenuOpen, setCalcMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Calculator className="h-5 w-5" />
          </span>
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setCalcMenuOpen(true)}
            onMouseLeave={() => setCalcMenuOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-brand-600">
              Calculators
              <ChevronDown className="h-4 w-4" />
            </button>
            {calcMenuOpen && (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-2">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
                  {categories.map((category) => (
                    <div key={category}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {category}
                      </p>
                      <ul className="space-y-1.5">
                        {calculators
                          .filter((c) => c.category === category)
                          .map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/${c.slug}`}
                                className="text-sm text-slate-700 hover:text-brand-600"
                              >
                                {c.shortTitle}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-brand-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-brand-600">
            Contact
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
            {categories.map((category) => (
              <div key={category} className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {category}
                </p>
                <ul className="space-y-2">
                  {calculators
                    .filter((c) => c.category === category)
                    .map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/${c.slug}`}
                          className="block text-sm text-slate-700"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.shortTitle}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <div className="flex gap-4 border-t border-slate-200 pt-4 text-sm font-medium text-slate-700">
              <Link href="/about" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

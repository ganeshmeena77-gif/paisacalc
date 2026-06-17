"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator, ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import { calculators, SITE_NAME } from "@/lib/calculatorMeta";
import { useTheme } from "@/lib/useTheme";

const categories = Array.from(new Set(calculators.map((c) => c.category)));

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcMenuOpen, setCalcMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-blue-50 backdrop-blur dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors\">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg\">
            <Calculator className="h-5 w-5" />
          </span>
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setCalcMenuOpen(true)}
            onMouseLeave={() => setCalcMenuOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
              Calculators
              <ChevronDown className="h-4 w-4" />
            </button>
            {calcMenuOpen && (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-2xl border border-indigo-100 bg-white/95 p-6 shadow-2xl backdrop-blur">
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
                                className="text-sm text-slate-700 hover:text-indigo-600 hover:font-medium transition-colors"
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
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors md:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
          <div className="border-t border-indigo-100 bg-white/95 md:hidden dark:border-slate-700 dark:bg-slate-900/95">
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
                          className="block text-sm text-slate-700 hover:text-indigo-600 hover:font-medium transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.shortTitle}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <div className="flex gap-4 border-t border-indigo-100 pt-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300">
              <Link href="/about" className="hover:text-indigo-600 transition-colors" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="hover:text-indigo-600 transition-colors" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

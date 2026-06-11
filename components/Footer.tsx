import Link from "next/link";
import { Calculator } from "lucide-react";
import { calculators, SITE_NAME, SITE_TAGLINE } from "@/lib/calculatorMeta";

const categories = Array.from(new Set(calculators.map((c) => c.category)));

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Calculator className="h-4 w-4" />
              </span>
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-slate-500">{SITE_TAGLINE}</p>
            <p className="mt-3 text-xs text-slate-400">
              Free online calculators for income tax, investments, loans, and savings — built for India.
            </p>
          </div>

          {categories.map((category) => (
            <div key={category}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {category}
              </p>
              <ul className="space-y-2">
                {calculators
                  .filter((c) => c.category === category)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}`} className="text-sm text-slate-600 hover:text-brand-600">
                        {c.shortTitle}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-brand-600">About</Link>
            <Link href="/contact" className="hover:text-brand-600">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-brand-600">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-brand-600">Disclaimer</Link>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-slate-400">
          {SITE_NAME} provides free calculators for educational and informational purposes only. The
          results are estimates based on the inputs you provide and standard formulas, and should not be
          considered financial, tax, or legal advice. Please consult a qualified professional before
          making any financial decisions.
        </p>
      </div>
    </footer>
  );
}

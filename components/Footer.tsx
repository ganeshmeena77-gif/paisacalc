import Link from "next/link";
import { Calculator } from "lucide-react";
import { calculators, SITE_NAME, SITE_TAGLINE } from "@/lib/calculatorMeta";

const categories = Array.from(new Set(calculators.map((c) => c.category)));

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-slate-900 hover:text-brand-600 transition-colors">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-md">
                <Calculator className="h-4 w-4" />
              </span>
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-slate-700 font-medium">{SITE_TAGLINE}</p>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Free online calculators for income tax, investments, loans, and savings — built for India.
            </p>
          </div>

          {categories.map((category) => (
            <div key={category}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {category}
              </p>
              <ul className="space-y-2.5">
                {calculators
                  .filter((c) => c.category === category)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}`} className="text-sm text-slate-600 hover:text-brand-600 hover:font-medium transition-colors">
                        {c.shortTitle}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-300 pt-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-brand-600 hover:font-medium transition-colors">About</Link>
            <Link href="/contact" className="hover:text-brand-600 hover:font-medium transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-brand-600 hover:font-medium transition-colors">Privacy Policy</Link>
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

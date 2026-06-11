import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SITE_NAME } from "@/lib/calculatorMeta";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the PaisaCalc team to report an issue, suggest a new calculator, or ask a question about our Indian finance and tax calculators.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Report an issue, suggest a calculator, or ask a question.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contact Us</h1>
      </header>

      <article className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-lg prose-a:text-brand-600">
        <p>
          We&apos;d love to hear from you. Whether you&apos;ve spotted an incorrect calculation, found a bug,
          have a suggestion for a new calculator, or just want to say hello &mdash; the best way to reach us
          is by email.
        </p>

        <div className="not-prose my-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-slate-500">Email us at</p>
            <a href="mailto:contact@paisacalc.com" className="font-semibold text-brand-600">
              contact@paisacalc.com
            </a>
          </div>
        </div>

        <h2>What to Include</h2>
        <p>To help us respond quickly, please mention:</p>
        <ul>
          <li>Which calculator you&apos;re writing about (e.g. &ldquo;Income Tax Calculator&rdquo;)</li>
          <li>The inputs you used and the result you got, if you&apos;re reporting an incorrect calculation</li>
          <li>What you expected to happen instead, with a reference if possible (e.g. a Budget circular or RBI notification)</li>
        </ul>

        <h2>Found an Error in a Tax or Interest Rate?</h2>
        <p>
          Tax slabs, PPF rates, EPF contribution limits, and similar figures are revised periodically by the
          Government of India and the RBI. We do our best to keep every calculator current, but if you notice
          a figure that&apos;s out of date, please let us know &mdash; we treat these reports as a priority
          and aim to correct them promptly.
        </p>

        <h2>Response Time</h2>
        <p>
          {SITE_NAME} is a small, independently run project, so please allow a few days for a response.
          We read every message, even if we can&apos;t reply to all of them individually.
        </p>
      </article>
    </div>
  );
}

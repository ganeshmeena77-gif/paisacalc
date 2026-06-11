import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/calculatorMeta";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "PaisaCalc's calculators provide estimates for educational purposes only and are not financial, tax, or legal advice. Read our full disclaimer before relying on any results.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: `Disclaimer | ${SITE_NAME}`,
    description: "Our calculators are for educational purposes only and are not financial advice.",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Disclaimer</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: June 2026</p>
      </header>

      <article className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-lg prose-a:text-brand-600">
        <h2>1. General Information Only</h2>
        <p>
          All calculators, tables, charts, and content on {SITE_NAME} (&ldquo;the Site&rdquo;) are provided for{" "}
          <strong>general informational and educational purposes only</strong>. They are designed to help you
          understand and estimate common financial calculations relevant to India, such as income tax, SIP and
          lumpsum returns, EMIs, GST, fixed and recurring deposits, PPF, HRA, gratuity, NPS, and salary
          breakdowns.
        </p>

        <h2>2. Not Financial, Tax, or Legal Advice</h2>
        <p>
          Nothing on this Site constitutes financial, investment, tax, accounting, or legal advice, nor does it
          constitute a recommendation to buy, sell, or hold any security, investment product, insurance policy,
          or financial instrument. You should not rely on any calculation or content on this Site as a
          substitute for advice from a qualified Chartered Accountant, financial advisor, tax consultant, or
          legal professional who is familiar with your specific circumstances.
        </p>

        <h2>3. Accuracy of Calculations</h2>
        <p>
          We take care to base our calculators on the rules, formulas, slabs, and rates applicable for{" "}
          <strong>FY 2026-27 (AY 2027-28)</strong> at the time of publishing, and we reference official sources
          such as the Income Tax Act, Union Budget announcements, RBI and EPFO notifications, and the Payment
          of Gratuity Act, 1972. However:
        </p>
        <ul>
          <li>Results are <strong>estimates</strong> based solely on the inputs you provide and standard formulas &mdash; they do not account for every individual circumstance, exemption, or special case.</li>
          <li>Actual returns on market-linked investments (SIP, lumpsum, NPS, SWP, step-up SIP) are <strong>not guaranteed</strong> and depend on market performance.</li>
          <li>Bank interest rates (FD, RD, PPF), tax slabs, deduction limits, and exemption thresholds are subject to change by the Government of India, the RBI, or individual banks at any time.</li>
        </ul>

        <h2>4. Changes in Laws and Rates</h2>
        <p>
          Tax laws, interest rates, and regulatory limits in India are revised periodically, often through the
          annual Union Budget or RBI/EPFO circulars. While we aim to keep our calculators updated, there may be
          a delay between an official change and our update of the Site. Always verify critical figures against
          official government sources or with a qualified professional before making financial decisions.
        </p>

        <h2>5. No Liability</h2>
        <p>
          {SITE_NAME}, its owner(s), and contributors shall not be held liable for any loss, damage, or
          inconvenience &mdash; financial or otherwise &mdash; arising directly or indirectly from the use of,
          or reliance on, any calculator, content, or information provided on this Site.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          This Site may contain links to third-party websites, including official government portals, for
          reference purposes. We do not control and are not responsible for the content, accuracy, or
          availability of any linked external sites.
        </p>

        <h2>7. Questions</h2>
        <p>
          If you believe a calculator on this Site contains an error or is based on outdated rules, please let
          us know via our <Link href="/contact">Contact</Link> page &mdash; we treat accuracy reports as a
          priority. See also our <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { calculators, SITE_NAME } from "@/lib/calculatorMeta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PaisaCalc offers 15 free, easy-to-use calculators for Indian income tax, investments, loans, and savings — built for FY 2026-27, with no login or signup required.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description:
      "Free, accurate, India-specific financial calculators — no login, no signup, just instant results.",
  },
};

const categories = Array.from(new Set(calculators.map((c) => c.category)));

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">About {SITE_NAME}</h1>
      </header>

      <article className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-lg prose-a:text-brand-600">
        <p>
          {SITE_NAME} is a free collection of calculators built specifically for Indian taxpayers, investors,
          and salaried professionals. Our goal is simple: help you make sense of your money &mdash; income
          tax, investments, loans, and savings &mdash; without spreadsheets, sign-ups, or guesswork.
        </p>

        <h2>Our Mission</h2>
        <p>
          Personal finance in India involves a lot of numbers: tax slabs that change every Budget, EMI
          schedules, PPF and NPS maturity values, HRA exemptions, gratuity rules, and more. Most people either
          rely on rough mental math or complicated bank spreadsheets. {SITE_NAME} aims to make these
          calculations instant, transparent, and accurate &mdash; so you can plan with confidence.
        </p>

        <h2>What We Offer</h2>
        <p>
          We currently offer 15 calculators covering every major area of personal finance in India:
        </p>
        {categories.map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            <ul>
              {calculators
                .filter((c) => c.category === category)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`}>{c.shortTitle}</Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <h2>Accuracy &amp; Updates</h2>
        <p>
          Every calculator on {SITE_NAME} is built around the official rules in effect for{" "}
          <strong>FY 2026-27 (AY 2027-28)</strong> &mdash; including the latest income tax slabs for both the
          new and old regimes, the current PPF interest rate, EPF contribution rates, and gratuity exemption
          limits. Tax laws and interest rates in India change periodically (often with the annual Union
          Budget), so we review and update our formulas whenever new rules are announced. Each calculator page
          also explains the underlying formula and shows a worked example, so you can verify the logic
          yourself.
        </p>
        <p>
          That said, these tools provide <strong>estimates</strong> based on the inputs you provide and
          standard formulas &mdash; they are not a substitute for professional advice. Please see our{" "}
          <Link href="/disclaimer">Disclaimer</Link> for more details.
        </p>

        <h2>No Sign-Up, No Data Collection</h2>
        <p>
          {SITE_NAME} runs entirely in your browser. There&apos;s no login, no account, and we don&apos;t ask
          for or store any personal or financial information you enter into a calculator &mdash; your numbers
          never leave your device. For details on cookies and advertising, see our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Spotted an error, have a suggestion, or want a calculator we don&apos;t have yet? We&apos;d love to
          hear from you &mdash; visit our <Link href="/contact">Contact</Link> page.
        </p>
      </article>
    </div>
  );
}

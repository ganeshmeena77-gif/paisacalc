import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import LumpsumCalculator from "@/components/calculators/LumpsumCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("lumpsum-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is a lumpsum investment?",
    answer:
      "A lumpsum investment means putting in a single, one-time amount into a mutual fund or other instrument, rather than spreading it out over time. The entire amount starts compounding immediately, so the future value depends on the amount invested, the expected rate of return, and the time horizon.",
  },
  {
    question: "Lumpsum vs SIP — which is better?",
    answer:
      "A lumpsum investment can generate higher returns if invested right before markets rise, since the full amount benefits from compounding from day one. A SIP spreads your investment over time and smooths out volatility through rupee-cost averaging, which can reduce timing risk. Many investors use lumpsum for windfalls (bonus, inheritance, maturity proceeds) and SIPs for regular monthly savings — the two approaches work well together.",
  },
  {
    question: "What return rate should I assume for a lumpsum calculator?",
    answer:
      "Equity mutual funds in India have historically delivered 10–14% annually over long periods, though returns are market-linked and not guaranteed. For long-term goals, a conservative assumption of 10–12% is reasonable. For debt funds or hybrid funds, 6–9% may be more realistic. This calculator lets you adjust the rate to see how sensitive your outcome is to your assumptions.",
  },
  {
    question: "Is a lumpsum mutual fund investment taxed?",
    answer:
      "For equity mutual funds, gains on units held for more than 12 months are treated as long-term capital gains (LTCG) and taxed at 12.5% on gains above ₹1.25 lakh in a financial year. Units sold within 12 months attract short-term capital gains (STCG) tax at 20%. Debt funds are taxed differently — gains are added to your income and taxed at your slab rate, regardless of holding period.",
  },
  {
    question: "How does the power of compounding work for a one-time investment?",
    answer:
      "With a lumpsum investment, the entire principal earns returns every year, and those returns themselves start earning returns in subsequent years. This is why the gap between invested amount and total value widens dramatically over longer periods — the longer you stay invested, the larger the share of your final corpus that comes purely from compounding rather than your original capital.",
  },
  {
    question: "When should I consider a lumpsum investment?",
    answer:
      "Lumpsum investments are ideal when you receive a large sum at once — such as an annual bonus, inheritance, sale proceeds from property, or maturity amount from an FD or insurance policy — and have a long investment horizon (5+ years) so short-term market volatility has time to even out. If you're unsure about market timing, you could also consider staggering a large amount into the market over a few months using a Systematic Transfer Plan (STP).",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Estimate how much your one-time mutual fund investment can grow into over time, with a year-wise breakdown of invested amount vs. estimated returns."
      tool={<LumpsumCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How Lumpsum Returns Are Calculated</h2>
      <p>
        A lumpsum investment is a single, one-time amount invested in a mutual fund or other instrument. Unlike
        a SIP, where each instalment compounds for a different length of time, a lumpsum investment compounds
        as a whole from the day it is invested until the end of the investment horizon. The future value of a
        lumpsum investment is calculated using the standard compound interest formula:
      </p>
      <pre>
        <code>A = P × (1 + r)^t</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>A</strong> = future value of the investment (maturity amount)</li>
        <li><strong>P</strong> = principal, i.e. the amount invested initially</li>
        <li><strong>r</strong> = expected annual rate of return (as a decimal)</li>
        <li><strong>t</strong> = investment time period in years</li>
      </ul>
      <p>
        Because the entire amount is invested upfront, it benefits from compounding for the full duration of
        the investment. The longer the time period, the larger the gap between the amount you invested and the
        final value — this gap is purely the result of compounding.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you invest <strong>₹1,00,000 as a lumpsum</strong> for <strong>10 years</strong>, expecting an
        annual return of <strong>12%</strong>. Here, P = ₹1,00,000, r = 0.12, and t = 10.
      </p>
      <p>
        A = 1,00,000 × (1.12)<sup>10</sup> ≈ <strong>₹3,10,585</strong>
      </p>
      <p>
        Your invested amount stays at <strong>₹1,00,000</strong> throughout, while the estimated returns work
        out to about <strong>₹2,10,585</strong> — meaning your money more than triples over 10 years purely
        from compounding at 12% per annum. This is why staying invested for longer durations matters more for
        lumpsum investments than trying to time short-term market movements.
      </p>
    </CalculatorLayout>
  );
}

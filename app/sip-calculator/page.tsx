import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import SipCalculator from "@/components/calculators/SipCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("sip-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is a SIP and how does it work?",
    answer:
      "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund every month. Your money buys units at the prevailing NAV, so over time you benefit from rupee-cost averaging and the power of compounding, regardless of whether markets are up or down.",
  },
  {
    question: "What return rate should I use in the SIP calculator?",
    answer:
      "Equity mutual funds in India have historically returned 10–14% annually over long periods, though returns are never guaranteed and vary by fund and market conditions. Use a conservative rate (10–12%) for long-term planning, and remember this calculator shows an estimate, not a promise.",
  },
  {
    question: "Is SIP better than a lumpsum investment?",
    answer:
      "SIP works well when you have a regular monthly income and want to invest gradually, smoothing out market volatility through rupee-cost averaging. A lumpsum investment can generate higher returns if invested right before a market rally, but carries more timing risk. Many investors do both.",
  },
  {
    question: "Are SIP returns guaranteed?",
    answer:
      "No. Mutual fund SIPs are market-linked, so returns depend on the performance of the underlying stocks or bonds. The figures shown by this calculator are projections based on the return rate you enter, not guaranteed outcomes.",
  },
  {
    question: "Are SIP investments taxed?",
    answer:
      "Each SIP instalment is treated as a separate investment for tax purposes. For equity mutual funds, gains on units held over 12 months are long-term capital gains (LTCG), taxed at 12.5% above ₹1.25 lakh per year; units sold within 12 months attract short-term capital gains (STCG) tax at 20%.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Estimate how much your monthly mutual fund SIP can grow into over time, with a year-wise breakdown of invested amount vs. estimated returns."
      tool={<SipCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How SIP Returns Are Calculated</h2>
      <p>
        A Systematic Investment Plan (SIP) lets you invest a fixed amount every month into a mutual fund.
        Because each instalment is invested at a different time, it earns compound returns for a different
        number of months. The future value of a SIP is calculated using the annuity-due formula:
      </p>
      <pre>
        <code>FV = M × ({"{"}[1 + i]^n – 1{"}"} / i) × (1 + i)</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>FV</strong> = future value of the investment (maturity amount)</li>
        <li><strong>M</strong> = amount invested every month</li>
        <li><strong>i</strong> = expected monthly rate of return (annual rate ÷ 12 ÷ 100)</li>
        <li><strong>n</strong> = total number of monthly instalments (years × 12)</li>
      </ul>
      <p>
        The extra <code>(1 + i)</code> factor accounts for the fact that each instalment is assumed to be
        invested at the start of the month, so it earns one additional month of growth.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you invest <strong>₹10,000 every month</strong> for <strong>10 years</strong>, expecting an
        annual return of <strong>12%</strong>. Here, i = 12% ÷ 12 ÷ 100 = 0.01, and n = 10 × 12 = 120 months.
      </p>
      <p>
        FV = 10,000 × ((1.01<sup>120</sup> − 1) / 0.01) × 1.01 ≈ <strong>₹23,23,391</strong>
      </p>
      <p>
        Of this, your total invested amount is ₹12,00,000 (₹10,000 × 120 months), and the estimated returns
        are about <strong>₹11,23,391</strong> — almost equal to the amount you invested, purely from
        compounding. This is why SIPs work best when you start early and stay invested for the long term.
      </p>
    </CalculatorLayout>
  );
}

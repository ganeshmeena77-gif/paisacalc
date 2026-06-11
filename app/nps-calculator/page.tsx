import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import NpsCalculator from "@/components/calculators/NpsCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("nps-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is the National Pension System (NPS)?",
    answer:
      "The National Pension System (NPS) is a voluntary, government-regulated retirement savings scheme administered by the PFRDA. Your monthly contributions are invested in a mix of equity, corporate bonds, and government securities (based on the allocation you choose), and the corpus grows until you retire, when part of it is paid out as a lumpsum and the rest is used to buy an annuity that pays you a monthly pension.",
  },
  {
    question: "What is the difference between NPS Tier I and Tier II accounts?",
    answer:
      "Tier I is the primary retirement account — contributions are locked in until age 60 (with limited partial withdrawals allowed) and qualify for tax benefits. Tier II is a voluntary savings account with no lock-in, allowing you to withdraw money anytime, but it does not offer the same tax deductions as Tier I (except for government employees in certain cases).",
  },
  {
    question: "What tax benefits does NPS offer?",
    answer:
      "Under the old tax regime, contributions to NPS Tier I qualify for a deduction of up to ₹1.5 lakh under Section 80CCD(1) (within the overall 80C limit), plus an additional ₹50,000 under Section 80CCD(1B), exclusively for NPS. If your employer contributes to your NPS account, that amount is deductible under Section 80CCD(2), up to 10% of salary (14% for government employees), and this benefit is available even under the new tax regime.",
  },
  {
    question: "Is the lumpsum withdrawal from NPS taxable?",
    answer:
      "No. Since Budget 2021, NPS enjoys EEE (Exempt-Exempt-Exempt) status for the lumpsum portion — up to 60% of your accumulated corpus can be withdrawn as a tax-free lumpsum at retirement. The contributions, the growth, and this lumpsum withdrawal are all exempt from tax.",
  },
  {
    question: "What happens to the annuity portion of my NPS corpus?",
    answer:
      "At least 40% of your corpus must be used to purchase an annuity from a PFRDA-empanelled insurance company. This annuity pays you a regular monthly pension for life, but unlike the lumpsum, the pension income you receive is fully taxable in the year you receive it, as per your applicable income tax slab.",
  },
  {
    question: "What is the minimum annuity purchase requirement in NPS?",
    answer:
      "On normal retirement at or after age 60, you must use at least 40% of your accumulated corpus to buy an annuity, and you can withdraw up to 60% as a lumpsum. You can choose to put a higher percentage into the annuity if you want a larger monthly pension — this calculator lets you adjust that percentage from 40% to 100%.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Estimate how your monthly NPS contributions can grow into a retirement corpus, and see the expected tax-free lumpsum and monthly pension at retirement."
      tool={<NpsCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How NPS Returns Are Calculated</h2>
      <p>
        The National Pension System works much like a SIP during your working years: every month, a fixed
        amount is invested and compounds at the expected rate of return until you retire. The future value
        of these contributions is calculated using the same annuity-due formula used for SIPs:
      </p>
      <pre>
        <code>Total Corpus = M × ({"{"}[1 + i]^n – 1{"}"} / i) × (1 + i)</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>M</strong> = monthly contribution</li>
        <li><strong>i</strong> = expected monthly rate of return (annual return ÷ 12 ÷ 100)</li>
        <li><strong>n</strong> = total number of monthly contributions, i.e. (retirement age − current age) × 12</li>
      </ul>
      <p>
        At retirement, the accumulated corpus is split into two parts as per PFRDA rules. Up to{" "}
        <strong>60% can be withdrawn as a tax-free lumpsum</strong>, and at least{" "}
        <strong>40% must be used to purchase an annuity</strong> from an insurance company. The annuity
        corpus is then converted into a monthly pension using the expected annuity rate:
      </p>
      <pre>
        <code>Monthly Pension = Annuity Corpus × Annuity Rate ÷ 12 ÷ 100</code>
      </pre>

      <h3>Worked Example</h3>
      <p>
        Suppose you start contributing <strong>₹5,000 every month</strong> from age <strong>30</strong> until
        you retire at <strong>60</strong> (a tenure of 30 years), expecting an annual return of{" "}
        <strong>10%</strong>, opting for the minimum <strong>40% annuity purchase</strong>, with an expected
        annuity rate of <strong>6%</strong>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Total Investment</td><td>₹18,00,000</td></tr>
          <tr><td>Total Corpus at Retirement</td><td>₹1,13,96,627</td></tr>
          <tr><td>Lumpsum Withdrawal (60%, tax-free)</td><td>₹68,37,976</td></tr>
          <tr><td>Annuity Corpus (40%)</td><td>₹45,58,651</td></tr>
          <tr><td>Estimated Monthly Pension</td><td>₹22,793</td></tr>
        </tbody>
      </table>
      <p>
        Out of a total investment of ₹18,00,000 spread over 30 years, the power of compounding grows the
        corpus to over ₹1.13 crore. You can walk away with a tax-free lumpsum of ₹68,37,976, while the
        remaining ₹45,58,651 is converted into an annuity that pays you approximately ₹22,793 every month for
        life — though this pension amount is taxable as per your income tax slab. Increasing the annuity
        purchase percentage above the 40% minimum will reduce your lumpsum but increase your monthly pension.
      </p>
    </CalculatorLayout>
  );
}

import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import FdCalculator from "@/components/calculators/FdCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("fd-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "How is FD interest calculated?",
    answer:
      "Fixed Deposit (FD) interest is calculated using the compound interest formula: A = P × (1 + r/n)^(n×t), where P is the principal amount, r is the annual interest rate (as a decimal), n is the number of times interest is compounded per year, and t is the tenure in years. The maturity value (A) includes both your original deposit and the compounded interest earned.",
  },
  {
    question: "Is FD interest taxable in India?",
    answer:
      "Yes. Interest earned on a fixed deposit is fully taxable as 'Income from Other Sources' and is added to your total income for the year, taxed at your applicable income tax slab rate. This is true regardless of whether the bank deducts TDS — TDS is only an upfront deduction, not the final tax liability.",
  },
  {
    question: "What is TDS on fixed deposits?",
    answer:
      "Banks deduct TDS (Tax Deducted at Source) at 10% if the total interest earned on your FDs with that bank exceeds ₹40,000 in a financial year (₹50,000 for senior citizens). If your PAN is not linked or not provided, TDS may be deducted at a higher rate. You can claim credit for this TDS while filing your income tax return, and if your total tax liability is lower (or nil), you can claim a refund.",
  },
  {
    question: "What's the difference between cumulative and non-cumulative FDs?",
    answer:
      "In a cumulative FD, interest is compounded and paid out along with the principal at maturity — this is what this calculator computes. In a non-cumulative FD, interest is paid out periodically (monthly, quarterly, or annually) as income, and only the original principal is returned at maturity. Cumulative FDs are better for wealth accumulation, while non-cumulative FDs suit those who need regular income.",
  },
  {
    question: "Is there a penalty for premature FD withdrawal?",
    answer:
      "Most banks charge a penalty for withdrawing an FD before its maturity date, typically in the form of a reduced interest rate (often 0.5% to 1% lower than the rate applicable for the period the deposit was actually held). The exact penalty terms vary by bank and the specific FD scheme, so it's worth checking the terms before booking, especially if you may need the funds early.",
  },
  {
    question: "How does compounding frequency affect FD returns?",
    answer:
      "The more frequently interest is compounded, the higher your effective returns for the same nominal interest rate, because interest starts earning interest sooner. Monthly compounding yields slightly more than quarterly, which yields more than half-yearly or annual compounding. Most Indian bank FDs compound interest quarterly by default.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Calculate the maturity value and interest earned on your fixed deposit with quarterly, half-yearly, monthly, or annual compounding."
      tool={<FdCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How FD Maturity Value Is Calculated</h2>
      <p>
        A Fixed Deposit (FD) earns compound interest on the amount you deposit, based on the interest rate,
        tenure, and how often the interest is compounded. The maturity value is calculated as:
      </p>
      <pre>
        <code>A = P × (1 + r/n)^(n × t)</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>A</strong> = maturity value (principal + interest)</li>
        <li><strong>P</strong> = principal amount deposited</li>
        <li><strong>r</strong> = annual interest rate (as a decimal, e.g. 7% = 0.07)</li>
        <li><strong>n</strong> = number of times interest is compounded per year (4 for quarterly, 2 for half-yearly, 1 for annually, 12 for monthly)</li>
        <li><strong>t</strong> = tenure in years</li>
      </ul>
      <p>
        Most Indian banks compound FD interest <strong>quarterly</strong> by default, which is why it's the
        default option in the calculator above. The total interest earned is simply A − P.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you deposit <strong>₹1,00,000</strong> in a fixed deposit at <strong>7% per annum</strong>{" "}
        for <strong>5 years</strong>, with <strong>quarterly compounding</strong> (n = 4).
      </p>
      <p>
        A = 1,00,000 × (1 + 0.07/4)^(4 × 5) = 1,00,000 × (1.0175)^20 ≈ <strong>₹1,41,478</strong>
      </p>
      <p>
        Of this maturity value, your original principal of ₹1,00,000 stays the same, and the{" "}
        <strong>total interest earned is approximately ₹41,478</strong> over the 5-year period.
      </p>

      <h3>Tax on FD Interest and TDS</h3>
      <p>
        FD interest is fully taxable at your income tax slab rate, regardless of how it is paid out. Banks
        are required to deduct <strong>TDS at 10%</strong> if the total interest you earn from that bank
        exceeds <strong>₹40,000 in a financial year</strong> (the threshold is{" "}
        <strong>₹50,000 for senior citizens</strong>). TDS is only a provisional deduction — you must still
        report the full interest income while filing your return, claim credit for the TDS already
        deducted, and pay any additional tax due based on your slab rate (or claim a refund if you've
        overpaid).
      </p>
    </CalculatorLayout>
  );
}

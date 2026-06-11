import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import EmiCalculator from "@/components/calculators/EmiCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("emi-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is EMI and how is it calculated?",
    answer:
      "EMI (Equated Monthly Instalment) is the fixed amount you pay every month towards your loan, covering both principal and interest. It is calculated using the reducing-balance formula EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate, and n is the tenure in months. This formula ensures your monthly payment stays constant for the entire loan tenure.",
  },
  {
    question: "Does the EMI change over the loan tenure?",
    answer:
      "No, for a fixed-rate loan the EMI amount stays the same every month for the entire tenure. However, the split between principal and interest within each EMI changes — early instalments are interest-heavy because the outstanding balance is high, while later instalments repay more principal as the balance shrinks.",
  },
  {
    question: "How does prepayment reduce my total interest?",
    answer:
      "Since interest is charged only on the outstanding balance under the reducing-balance method, any extra payment you make towards the principal immediately lowers the balance on which future interest is calculated. This reduces either your remaining tenure (if EMI stays the same) or your EMI amount (if tenure stays the same), and cuts the total interest you pay over the life of the loan.",
  },
  {
    question: "What's the difference between fixed and floating interest rate loans?",
    answer:
      "A fixed-rate loan keeps the same interest rate (and hence the same EMI) throughout the tenure, regardless of market changes. A floating-rate loan is linked to a benchmark rate (like the repo rate) and can go up or down periodically — your EMI or tenure may be revised when the lender's rate changes. Most home loans in India are floating-rate, while personal and car loans are often fixed.",
  },
  {
    question: "Does this EMI include processing fees, insurance, or taxes?",
    answer:
      "No. This calculator computes the EMI based only on the principal, interest rate, and tenure you enter. Lenders typically charge a one-time processing fee (often 0.5%–2% of the loan amount), and may bundle in optional insurance premiums — these are separate from the EMI shown here and should be factored into your overall borrowing cost.",
  },
  {
    question: "How does loan tenure affect total interest paid?",
    answer:
      "A longer tenure reduces your monthly EMI but increases the total interest paid over the life of the loan, because you're carrying the outstanding balance for a longer period. A shorter tenure raises the EMI but significantly cuts total interest. It's worth comparing a few tenure options to balance monthly affordability against overall cost.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Calculate your monthly EMI for home, car, or personal loans, see the total interest payable, and view a year-wise repayment schedule."
      tool={<EmiCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How EMI Is Calculated</h2>
      <p>
        An Equated Monthly Instalment (EMI) is calculated using the standard reducing-balance formula used by
        banks and NBFCs across India:
      </p>
      <pre>
        <code>EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>P</strong> = principal loan amount</li>
        <li><strong>r</strong> = monthly interest rate (annual interest rate ÷ 12 ÷ 100)</li>
        <li><strong>n</strong> = loan tenure in months (years × 12)</li>
      </ul>
      <p>
        Under the <strong>reducing-balance method</strong>, interest for any given month is charged only on
        the loan balance that is still outstanding at the start of that month — not on the original loan
        amount. Each EMI payment first covers the interest due for that month, and whatever remains goes
        towards reducing the principal. As the principal shrinks month after month, the interest portion of
        each EMI gradually falls while the principal portion gradually rises, even though the total EMI
        amount stays fixed.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you take a <strong>home loan of ₹30,00,000</strong> at an interest rate of{" "}
        <strong>8.5% per annum</strong> for a tenure of <strong>20 years (240 months)</strong>.
      </p>
      <p>
        Here, P = ₹30,00,000, r = 8.5% ÷ 12 ÷ 100 = 0.0070833, and n = 240. Plugging these into the formula
        gives:
      </p>
      <p>
        EMI = 30,00,000 × 0.0070833 × (1.0070833)^240 / ((1.0070833)^240 − 1) ≈{" "}
        <strong>₹26,034.70</strong> (≈ ₹26,035 per month)
      </p>
      <p>
        Over the full 20-year tenure, you would pay a <strong>total of ₹62,48,327</strong>, of which{" "}
        <strong>₹32,48,327</strong> is interest and the remaining ₹30,00,000 is the principal you originally
        borrowed. This means the total interest paid is more than the principal itself — a reminder of why
        a shorter tenure or periodic prepayments can make a significant difference to your overall cost.
      </p>
    </CalculatorLayout>
  );
}

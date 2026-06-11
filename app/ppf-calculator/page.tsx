import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import PpfCalculator from "@/components/calculators/PpfCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("ppf-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is the current PPF interest rate?",
    answer:
      "The PPF interest rate is set by the government and reviewed every quarter. For the Apr–Jun 2026 quarter, the rate is 7.1% per annum, compounded annually. The rate has stayed at 7.1% for several consecutive quarters, but it can be revised up or down depending on prevailing bond yields, so always check the latest notified rate before making long-term plans.",
  },
  {
    question: "What is the PPF lock-in period and can it be extended?",
    answer:
      "A PPF account has a mandatory lock-in of 15 years from the end of the financial year in which it was opened. After maturity, you can either withdraw the entire balance, or extend the account in blocks of 5 years — with further contributions, or without (in which case it continues to earn interest on the existing balance).",
  },
  {
    question: "Is PPF interest and maturity amount taxable?",
    answer:
      "No. PPF enjoys 'EEE' (Exempt-Exempt-Exempt) status — your contributions qualify for a deduction under Section 80C (up to ₹1.5 lakh per year, only under the old tax regime), the interest earned every year is fully tax-free, and the maturity amount (principal + interest) is also completely exempt from tax when withdrawn.",
  },
  {
    question: "What are the minimum and maximum PPF deposit limits?",
    answer:
      "You must deposit at least ₹500 in a PPF account in a financial year to keep it active, and you can deposit a maximum of ₹1,50,000 per financial year (across all your PPF accounts combined). Deposits can be made in a lump sum or in up to 12 instalments during the year.",
  },
  {
    question: "Can I withdraw money from PPF before maturity?",
    answer:
      "Partial withdrawals are allowed from the 7th financial year onwards, subject to limits based on your account balance. You can also take a loan against your PPF balance between the 3rd and 6th year. Premature closure of the entire account is permitted only in specific cases, such as a medical emergency or higher education, and after a minimum of 5 years, usually with a small interest penalty.",
  },
  {
    question: "Can I open a PPF account for my child?",
    answer:
      "Yes, a parent or legal guardian can open a PPF account on behalf of a minor child. However, the combined deposits in the parent's own PPF account and the minor's account cannot exceed ₹1,50,000 per financial year for the purpose of claiming Section 80C deduction.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Calculate your PPF maturity amount based on your yearly contribution, tenure, and the current interest rate, with a year-wise growth table."
      tool={<PpfCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How PPF Maturity Is Calculated</h2>
      <p>
        The Public Provident Fund (PPF) is a government-backed long-term savings scheme designed to encourage
        retirement savings with guaranteed, tax-free returns. A PPF account has a minimum tenure of{" "}
        <strong>15 years</strong>, and can be extended after maturity in blocks of <strong>5 years</strong> —
        either with fresh contributions or simply left to grow on the existing balance.
      </p>
      <p>
        You can deposit a minimum of <strong>₹500</strong> and a maximum of <strong>₹1,50,000</strong> per
        financial year, in a lump sum or in up to 12 instalments. The interest rate is set by the government
        and revised every quarter — it is currently <strong>7.1% per annum for the Apr–Jun 2026 quarter</strong>,
        compounded annually.
      </p>
      <p>This calculator assumes the full yearly contribution is deposited at the start of the financial year (before April 5th), which earns interest for the entire year and is the best-case, most commonly quoted scenario. Each year, the balance grows as:</p>
      <pre>
        <code>balance = (balance + yearly investment) × (1 + rate)</code>
      </pre>
      <p>
        This is repeated once for every year of the tenure, with the interest compounding annually on the
        running balance.
      </p>

      <h3>Tax Treatment — "EEE" Status</h3>
      <p>
        PPF is one of the few investments in India with full <strong>EEE (Exempt-Exempt-Exempt)</strong> tax
        treatment: contributions qualify for a deduction under <strong>Section 80C</strong> (up to ₹1.5 lakh
        per year, available only if you opt for the <strong>old tax regime</strong>), the interest credited
        every year is tax-free, and the entire maturity proceeds — principal plus accumulated interest — are
        exempt from tax on withdrawal.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you invest the maximum permissible amount of <strong>₹1,50,000 every year</strong> for the
        minimum tenure of <strong>15 years</strong>, at the current interest rate of <strong>7.1%</strong>.
      </p>
      <p>
        Applying the formula above year after year, your account grows to a{" "}
        <strong>maturity value of ₹40,68,209</strong>. Of this, your{" "}
        <strong>total investment is ₹22,50,000</strong> (₹1,50,000 × 15 years), and the{" "}
        <strong>total interest earned is ₹18,18,209</strong> — more than 80% of your total contributions,
        entirely tax-free. This is the power of long-term, government-guaranteed compounding: the longer you
        extend your PPF account beyond 15 years, the larger the share of interest in your final corpus.
      </p>
    </CalculatorLayout>
  );
}

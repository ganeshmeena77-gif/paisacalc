import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import HraCalculator from "@/components/calculators/HraCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("hra-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is HRA exemption and how is it calculated?",
    answer:
      "House Rent Allowance (HRA) exemption under Section 10(13A) of the Income Tax Act lets salaried employees who pay rent reduce their taxable income. The exempt amount is the LEAST of three figures: (1) the actual HRA received from your employer, (2) rent paid minus 10% of your Basic Salary + DA, and (3) 50% of Basic + DA for metro cities or 40% for non-metro cities. Whatever portion of your HRA exceeds this exempt amount is added back to your taxable salary.",
  },
  {
    question: "Which cities are considered 'metro' for HRA purposes?",
    answer:
      "For HRA exemption, only Delhi, Mumbai, Kolkata, and Chennai are classified as metro cities, which allows a higher exemption limit of 50% of Basic + DA. All other cities — including Bengaluru, Hyderabad, Pune, Ahmedabad, and the rest — are treated as non-metro, with a limit of 40% of Basic + DA.",
  },
  {
    question: "Can I claim HRA exemption if I pay rent to my parents?",
    answer:
      "Yes, you can claim HRA exemption on rent paid to your parents, provided it is a genuine arrangement — you actually pay the rent (ideally via bank transfer), have a rental agreement, and your parents declare this rent as income in their tax returns. You generally cannot claim HRA exemption on rent paid to a spouse, as that arrangement is not recognised as a genuine landlord-tenant relationship.",
  },
  {
    question: "Is HRA exemption available under the new tax regime?",
    answer:
      "No. HRA exemption under Section 10(13A) is available only under the old tax regime. If you opt for the new tax regime (which is now the default), your entire HRA is treated as taxable salary, regardless of how much rent you pay. Use our Income Tax Calculator to compare your overall tax liability under both regimes before deciding which one to opt for.",
  },
  {
    question: "What if I don't receive HRA but still pay rent (Section 80GG)?",
    answer:
      "If your salary structure doesn't include HRA (or you're self-employed) but you pay rent, you may be able to claim a deduction under Section 80GG — limited to the lowest of ₹5,000 per month, 25% of your total income, or actual rent paid minus 10% of total income. This deduction is also available only under the old tax regime, and you must not own residential accommodation in the city where you live or work.",
  },
  {
    question: "Do I need to submit rent receipts and my landlord's PAN?",
    answer:
      "Most employers require monthly or quarterly rent receipts to process HRA exemption in your salary TDS. If your annual rent exceeds ₹1,00,000 (about ₹8,333 per month), you are also required to provide your landlord's PAN — and if the landlord doesn't have a PAN, a declaration from them is typically needed instead.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Calculate how much of your House Rent Allowance is tax-exempt under Section 10(13A), based on your salary, rent, and city."
      tool={<HraCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How HRA Exemption Is Calculated</h2>
      <p>
        House Rent Allowance (HRA) is a common component of salary for employees who live in rented
        accommodation. Under <strong>Section 10(13A)</strong> of the Income Tax Act, a portion of the HRA you
        receive can be exempt from tax. The exempt amount is the <strong>lowest</strong> of the following
        three values:
      </p>
      <ol>
        <li>The actual HRA received from your employer</li>
        <li>Rent paid minus 10% of (Basic Salary + Dearness Allowance)</li>
        <li>
          50% of (Basic Salary + DA) if you live in a metro city (Delhi, Mumbai, Kolkata, or Chennai), or 40%
          for any other city
        </li>
      </ol>
      <p>
        Whatever HRA you receive over and above this exempt amount is fully taxable and added to your
        salary income. Importantly, <strong>HRA exemption is available only under the old tax regime</strong> —
        if you choose the new tax regime, your full HRA is taxed as part of your salary. Use the{" "}
        <a href="/income-tax-calculator">Income Tax Calculator</a> to see which regime works out cheaper for
        you overall.
      </p>

      <h3>Worked Example</h3>
      <p>
        Consider a salaried employee in a metro city with a{" "}
        <strong>Basic Salary + DA of ₹40,000/month</strong>, receiving <strong>HRA of ₹20,000/month</strong>,
        and paying <strong>rent of ₹18,000/month</strong>.
      </p>
      <p>The three conditions work out as:</p>
      <ol>
        <li>Actual HRA received = ₹20,000</li>
        <li>Rent − 10% of Basic+DA = ₹18,000 − ₹4,000 = ₹14,000</li>
        <li>50% of Basic+DA (metro) = ₹20,000</li>
      </ol>
      <p>
        The lowest of these is <strong>₹14,000</strong>, so the{" "}
        <strong>HRA exemption is ₹14,000 per month (₹1,68,000 per year)</strong>. The remaining{" "}
        <strong>₹6,000 per month (₹72,000 per year)</strong> — the difference between the HRA received and
        the exempt amount — is added to taxable salary.
      </p>

      <h3>What If You Don't Receive HRA? — Section 80GG</h3>
      <p>
        If your salary doesn't include an HRA component but you still pay rent (this is also relevant for
        self-employed individuals), you may claim a deduction under <strong>Section 80GG</strong>, capped at
        the lowest of ₹5,000 per month or 25% of your total income (in addition to actual rent paid minus 10%
        of total income). Like HRA exemption, this is available only under the old tax regime.
      </p>

      <h3>Documentation</h3>
      <p>
        To claim HRA exemption, you typically need to submit rent receipts to your employer. If your annual
        rent exceeds <strong>₹1,00,000</strong>, you must also provide your <strong>landlord's PAN</strong> —
        without it, your employer may not allow the exemption while deducting TDS.
      </p>
    </CalculatorLayout>
  );
}

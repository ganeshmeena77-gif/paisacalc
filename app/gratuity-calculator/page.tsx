import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import GratuityCalculator from "@/components/calculators/GratuityCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("gratuity-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is the formula for calculating gratuity?",
    answer:
      "For employees covered under the Payment of Gratuity Act, 1972, gratuity is calculated as (Basic Salary + DA) × 15/26 × Years of Service, where 26 represents the number of working days in a month under the Act. For employees not covered under the Act, the formula uses 15/30 instead, based on the average salary of the last 10 months of service.",
  },
  {
    question: "What is the minimum service period to be eligible for gratuity?",
    answer:
      "Generally, an employee must complete at least 5 years of continuous service with an employer to be eligible for gratuity. This minimum period is waived in the unfortunate event of the employee's death or disablement due to accident or disease, in which case gratuity is paid regardless of the length of service.",
  },
  {
    question: "Is gratuity taxable in India?",
    answer:
      "Under Section 10(10) of the Income Tax Act, gratuity received is tax-exempt up to a lifetime limit of ₹20,00,000 across all employers. Any amount received above this limit is taxable as salary income. Government employees (central, state, and local authority) are not subject to this ceiling — their entire gratuity is fully tax-free.",
  },
  {
    question: "What is the difference between being 'covered' and 'not covered' under the Payment of Gratuity Act?",
    answer:
      "Most organisations with 10 or more employees are covered under the Payment of Gratuity Act, 1972, and must use the 15/26 formula with the 'round up if 6+ months' rule for the final year. Employees of organisations not covered under the Act are still typically paid gratuity as per their employment contract, but the calculation usually uses 15/30 and is based on the average salary of the last 10 months, without the same rounding benefit.",
  },
  {
    question: "How is gratuity treated for government employees?",
    answer:
      "Gratuity received by employees of the Central Government, State Governments, or local authorities is fully exempt from tax under Section 10(10)(i), with no upper limit. This is different from private-sector employees, whose exemption is capped at ₹20,00,000.",
  },
  {
    question: "Is gratuity included in my CTC, and does that mean I've already 'received' it?",
    answer:
      "Many companies show an estimated gratuity contribution as part of your CTC (Cost to Company), often calculated as roughly 4.81% of basic salary. However, this is only a notional accounting entry — you do not actually receive this amount as part of your monthly salary. Gratuity is paid out as a lump sum only when you leave the organisation after completing the eligibility period, calculated using your final basic salary and total years of service, not the amount shown in your CTC breakup.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Calculate your gratuity payout using the 15/26 formula and check how much of it is tax-exempt under Section 10(10)."
      tool={<GratuityCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How Gratuity Is Calculated</h2>
      <p>
        Gratuity is a lump-sum benefit paid by an employer to an employee in recognition of services
        rendered, typically when the employee retires, resigns after completing at least 5 years of
        continuous service, or in the unfortunate event of death or disability (where the 5-year requirement
        is waived).
      </p>
      <p>
        For employees <strong>covered under the Payment of Gratuity Act, 1972</strong> (which applies to most
        organisations with 10 or more employees), the formula is:
      </p>
      <pre>
        <code>Gratuity = (Basic + DA) × 15 / 26 × Years of Service</code>
      </pre>
      <p>
        Here, <strong>26</strong> represents the number of working days in a month as defined under the Act,
        and <strong>15</strong> represents 15 days' wages for every completed year of service. For employees{" "}
        <strong>not covered under the Act</strong>, the formula instead uses <strong>15/30</strong> (a 30-day
        month) and is based on the average salary of the last 10 months of service rather than the last
        drawn salary.
      </p>
      <p>
        For employees covered under the Act, there's also a rounding rule for the final year of service: if
        the remaining period after the last completed year is <strong>6 months or more, it is rounded up to
        a full year</strong>; if it's less than 6 months, it is ignored.
      </p>

      <h3>Tax Exemption Under Section 10(10)</h3>
      <p>
        Gratuity received is exempt from income tax under <strong>Section 10(10)</strong> up to a lifetime
        cumulative limit of <strong>₹20,00,000</strong> across all employers you've worked for. Any amount
        received above this limit is added to your taxable salary income. <strong>Government employees</strong>{" "}
        (central, state, or local authority) face no such ceiling — their entire gratuity is fully tax-free,
        regardless of the amount.
      </p>

      <h3>Worked Example</h3>
      <p>
        Consider an employee with a <strong>last drawn Basic + DA of ₹50,000/month</strong>, who has completed{" "}
        <strong>12.6 years of service</strong> and is covered under the Payment of Gratuity Act.
      </p>
      <p>
        Since the remaining 0.6 years (about 7 months) after the 12 completed years is 6 months or more, it
        is rounded up — so the <strong>years considered for calculation = 13</strong>. Applying the formula:
      </p>
      <p>
        Gratuity = ₹50,000 × 15 × 13 / 26 = <strong>₹3,75,000</strong>
      </p>
      <p>
        Since ₹3,75,000 is well below the ₹20,00,000 exemption limit under Section 10(10), the{" "}
        <strong>entire ₹3,75,000 is tax-exempt</strong>, and the taxable amount is <strong>₹0</strong>. This
        is the typical outcome for most employees, since gratuity amounts rarely approach the ₹20 lakh
        ceiling unless someone has a very high salary and decades of service.
      </p>
    </CalculatorLayout>
  );
}

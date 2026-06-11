import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import InHandSalaryCalculator from "@/components/calculators/InHandSalaryCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("in-hand-salary-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is the difference between CTC and in-hand salary?",
    answer:
      "CTC (Cost to Company) is the total amount your employer spends on you in a year — it includes your basic salary, allowances, employer's PF contribution, gratuity contribution, and other benefits. In-hand salary (take-home pay) is what actually gets credited to your bank account every month, after deducting employee PF, professional tax, and income tax, and after removing the employer-side contributions that never pass through your salary account.",
  },
  {
    question: "What is employer PF contribution and why doesn't it show up in my salary slip as income?",
    answer:
      "Employers typically contribute 12% of your basic salary to your Employees' Provident Fund (EPF) account, matching your own 12% contribution. While this employer contribution is included in your CTC, it goes directly into your retirement fund and is never paid out to you as monthly salary — it only becomes accessible when you withdraw your PF (on retirement, job change with conditions, or specific circumstances).",
  },
  {
    question: "What is the gratuity contribution shown in my CTC?",
    answer:
      "Gratuity is a lump-sum benefit paid by your employer when you leave the company after completing at least 5 years of continuous service, calculated as (Basic + DA) × 15/26 × years of service. Many companies show an estimated annual gratuity contribution (around 4.81% of basic salary) as part of your CTC, even though you don't receive this amount monthly — it's set aside and paid out only on separation.",
  },
  {
    question: "How is professional tax determined?",
    answer:
      "Professional tax is a small tax levied by state governments on salaried individuals, and the amount varies by state (some states like Delhi don't levy it at all). By law, the maximum professional tax that can be charged is capped at ₹2,500 per year (Article 276 of the Constitution). It's deducted directly from your salary by your employer and remitted to the state government.",
  },
  {
    question: "Should I choose the new or old tax regime for a higher take-home salary?",
    answer:
      "It depends on how many deductions you can claim. The new regime offers lower tax rates and a higher standard deduction (₹75,000) but disallows most exemptions like 80C, 80D, and HRA. The old regime has a lower standard deduction (₹50,000) but allows these deductions, including your own EPF contribution under 80C. If your eligible deductions (80C, 80D, HRA, home loan interest, etc.) are large — generally above ₹4-5 lakh for most income levels — the old regime may result in higher take-home pay; otherwise, the new regime usually wins. Use the toggle above to compare both for your numbers.",
  },
  {
    question: "What other deductions might further reduce my in-hand salary that aren't covered here?",
    answer:
      "This calculator covers the most common deductions — employee PF, professional tax, and income tax. Your actual salary slip may also show deductions for employee health/group insurance premiums, voluntary PF (VPF) contributions, labour welfare fund (a small amount in some states), loan or advance recoveries, and the National Pension System (NPS) if you've opted for an additional voluntary contribution. These are company- and state-specific, so check your actual payslip for the complete picture.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Convert your annual CTC into your actual monthly and annual in-hand (take-home) salary, after accounting for employer PF, gratuity, employee PF, professional tax, and income tax for FY 2026-27."
      tool={<InHandSalaryCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How In-Hand Salary Is Calculated</h2>
      <p>
        Your CTC (Cost to Company) is not the same as the salary that lands in your bank account. To arrive
        at your in-hand salary, several components that form part of CTC but never reach you directly must
        first be removed, and then your own deductions and income tax are subtracted from what remains. The
        calculation follows these steps:
      </p>
      <pre>
        <code>{`Basic Salary = CTC × Basic %
Employer PF = Basic × 12%
Gratuity Contribution = Basic × 4.81%
Gross Salary = CTC − Employer PF − Gratuity Contribution

Employee PF = Basic × 12%
Income Tax = tax computed on Gross Salary (less deductions, if Old Regime)

In-Hand Salary (Annual) = Gross Salary − Employee PF − Professional Tax − Income Tax
In-Hand Salary (Monthly) = In-Hand Salary (Annual) ÷ 12`}</code>
      </pre>
      <p>
        The <strong>employer's PF contribution</strong> (typically 12% of basic salary) and the{" "}
        <strong>gratuity contribution</strong> (about 4.81% of basic salary, based on the 15/26 formula
        spread over a year) are both part of your CTC, but they are retirement benefits set aside by your
        employer — they don't appear in your monthly salary credit. Once these are removed, you get your{" "}
        <strong>gross salary</strong>, from which your own EPF contribution, professional tax, and income tax
        are deducted to arrive at your final in-hand salary.
      </p>
      <p>
        Under the <strong>old tax regime</strong>, your employee PF contribution also counts towards your
        Section 80C deduction limit, along with any other deductions (80C, 80D, HRA, home loan interest,
        etc.) you enter. Under the <strong>new regime</strong>, no such deductions are allowed (apart from
        the flat standard deduction), but tax rates are generally lower.
      </p>

      <h3>Worked Example</h3>
      <p>
        Consider an annual CTC of <strong>₹12,00,000</strong>, with basic salary set at{" "}
        <strong>50% of CTC</strong>, professional tax of <strong>₹2,400/year</strong>, and the{" "}
        <strong>New Tax Regime</strong> (FY 2026-27).
      </p>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Annual CTC</td><td>₹12,00,000</td></tr>
          <tr><td>Basic Salary (50% of CTC)</td><td>₹6,00,000</td></tr>
          <tr><td>Employer PF (12% of Basic)</td><td>₹72,000</td></tr>
          <tr><td>Gratuity Contribution (4.81% of Basic)</td><td>₹28,860</td></tr>
          <tr><td>Gross Salary</td><td>₹10,99,140</td></tr>
          <tr><td>Employee PF (12% of Basic)</td><td>₹72,000</td></tr>
          <tr><td>Professional Tax</td><td>₹2,400</td></tr>
          <tr><td>Income Tax (New Regime)</td><td>₹0</td></tr>
          <tr><td>Annual In-Hand Salary</td><td>₹10,24,740</td></tr>
          <tr><td>Monthly In-Hand Salary</td><td>₹85,395</td></tr>
        </tbody>
      </table>
      <p>
        Here, the gross salary of ₹10,99,140 falls under the Section 87A rebate threshold for the new
        regime (taxable income up to ₹12,00,000 after the ₹75,000 standard deduction), so the income tax
        works out to <strong>₹0</strong>. After deducting the employee PF contribution of ₹72,000 and
        professional tax of ₹2,400, the annual in-hand salary comes to <strong>₹10,24,740</strong>, or
        approximately <strong>₹85,395 per month</strong> — about 85% of the original CTC.
      </p>
    </CalculatorLayout>
  );
}

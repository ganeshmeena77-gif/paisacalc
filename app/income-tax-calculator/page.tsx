import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import IncomeTaxCalculator from "@/components/calculators/IncomeTaxCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("income-tax-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What are the income tax slabs for FY 2026-27 (AY 2027-28)?",
    answer:
      "Budget 2026 retained the FY 2025-26 slab structure. Under the new regime: ₹0–4L is nil, ₹4–8L is taxed at 5%, ₹8–12L at 10%, ₹12–16L at 15%, ₹16–20L at 20%, ₹20–24L at 25%, and above ₹24L at 30%. Under the old regime: ₹0–2.5L is nil, ₹2.5–5L at 5%, ₹5–10L at 20%, and above ₹10L at 30% (exemption limits are higher for senior citizens).",
  },
  {
    question: "Is the new tax regime the default for FY 2026-27?",
    answer:
      "Yes. Under Section 115BAC, the new tax regime is the default option. If you want to be taxed under the old regime (to claim deductions like 80C, 80D, or HRA), you must specifically opt for it while filing your return.",
  },
  {
    question: "What is the standard deduction for FY 2026-27?",
    answer:
      "Salaried individuals and pensioners get a standard deduction of ₹75,000 under the new regime and ₹50,000 under the old regime. This is deducted from your gross salary before calculating taxable income, and is applied automatically by this calculator.",
  },
  {
    question: "How does the Section 87A rebate make income up to ₹12.75 lakh tax-free?",
    answer:
      "Under the new regime, taxpayers with taxable income up to ₹12,00,000 get a rebate of up to ₹60,000 under Section 87A, bringing their tax to zero. Add the ₹75,000 standard deduction, and a salaried individual can have a gross salary of up to ₹12,75,000 with zero tax liability.",
  },
  {
    question: "What is marginal relief and when does it apply?",
    answer:
      "Marginal relief ensures that if your taxable income is just above the rebate threshold (₹12L new regime / ₹5L old regime), your tax doesn't jump suddenly. The tax payable is capped at the amount by which your income exceeds the threshold. This calculator applies marginal relief automatically.",
  },
  {
    question: "Which deductions can I claim under the old regime but not the new regime?",
    answer:
      "The old regime allows deductions such as Section 80C (up to ₹1.5L for PPF, ELSS, life insurance, etc.), Section 80D (health insurance premiums), HRA exemption, home loan interest under Section 24(b), and NPS contributions under 80CCD(1B). The new regime does not allow most of these — only the standard deduction and employer's NPS contribution.",
  },
  {
    question: "What is the STCG tax rate on equity for FY 2025-26 and FY 2026-27?",
    answer:
      "Short-term capital gains (STCG) on equity shares and equity-oriented mutual funds (held for less than 12 months) are taxed at a flat 20% under Section 111A, effective from 23 July 2024 (Budget 2024). This rate applies for both FY 2025-26 and FY 2026-27. Prior to Budget 2024, the rate was 15%. Long-term capital gains (LTCG) on equity above ₹1.25 lakh per year are taxed at 12.5% under Section 112A.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Compare your tax liability under the new vs old tax regime for FY 2026-27 (AY 2027-28), and instantly see which one saves you more money."
      tool={<IncomeTaxCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How Income Tax is Calculated for FY 2026-27 (AY 2027-28)</h2>
      <p>
        Every year, the Union Budget can revise income tax slabs, deductions, and rebates. For FY 2026-27,
        Budget 2026 retained the slab structure introduced in Budget 2025 for both the new and old tax
        regimes. The <strong>new tax regime is the default</strong> — you only fall under the old regime if
        you specifically opt for it while filing your return.
      </p>

      <h3>New Tax Regime Slabs (FY 2026-27)</h3>
      <table>
        <thead>
          <tr>
            <th>Taxable Income</th>
            <th>Tax Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>₹0 – ₹4,00,000</td><td>Nil</td></tr>
          <tr><td>₹4,00,000 – ₹8,00,000</td><td>5%</td></tr>
          <tr><td>₹8,00,000 – ₹12,00,000</td><td>10%</td></tr>
          <tr><td>₹12,00,000 – ₹16,00,000</td><td>15%</td></tr>
          <tr><td>₹16,00,000 – ₹20,00,000</td><td>20%</td></tr>
          <tr><td>₹20,00,000 – ₹24,00,000</td><td>25%</td></tr>
          <tr><td>Above ₹24,00,000</td><td>30%</td></tr>
        </tbody>
      </table>
      <p>
        A flat <strong>standard deduction of ₹75,000</strong> applies to salary/pension income. In addition,
        the <strong>Section 87A rebate</strong> of up to ₹60,000 brings tax to zero for taxable income up to
        ₹12,00,000 — so a salaried person with a gross salary up to ₹12,75,000 pays no tax. Just above this
        threshold, <strong>marginal relief</strong> caps the tax increase to the amount of income that
        crosses ₹12,00,000.
      </p>

      <h3>Old Tax Regime Slabs</h3>
      <table>
        <thead>
          <tr>
            <th>Taxable Income</th>
            <th>Tax Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>₹0 – ₹2,50,000 (₹3,00,000 for 60-80 yrs / ₹5,00,000 for 80+ yrs)</td><td>Nil</td></tr>
          <tr><td>Up to ₹5,00,000</td><td>5%</td></tr>
          <tr><td>₹5,00,000 – ₹10,00,000</td><td>20%</td></tr>
          <tr><td>Above ₹10,00,000</td><td>30%</td></tr>
        </tbody>
      </table>
      <p>
        The old regime has a lower ₹50,000 standard deduction, but allows other deductions: Section 80C
        (up to ₹1.5L for PPF, ELSS, EPF, life insurance), Section 80D (health insurance), HRA exemption, home
        loan interest under Section 24(b), and 80CCD(1B) for NPS. The Section 87A rebate of up to ₹12,500
        applies if taxable income is up to ₹5,00,000, with marginal relief just above that.
      </p>

      <h3>Surcharge &amp; Health and Education Cess</h3>
      <p>
        A 4% Health and Education Cess applies to tax (after rebate) plus surcharge, under both regimes. A
        surcharge applies only to higher incomes: 10% above ₹50L, 15% above ₹1Cr, and 25% above ₹2Cr (the
        new regime caps surcharge at 25% even for incomes above ₹5Cr, while the old regime surcharge can go
        up to 37%).
      </p>

      <h3>Capital Gains Tax Rates (FY 2025-26 &amp; FY 2026-27)</h3>
      <p>
        Capital gains are taxed separately from salary income. For equity shares and equity mutual funds,{" "}
        <strong>short-term capital gains (STCG)</strong> — units held for less than 12 months — are taxed at a
        flat <strong>20%</strong> under Section 111A (raised from 15% by Budget 2024, effective 23 July 2024).{" "}
        <strong>Long-term capital gains (LTCG)</strong> above ₹1.25 lakh per year are taxed at{" "}
        <strong>12.5%</strong> under Section 112A. Debt fund gains are added to your income and taxed at your
        applicable slab rate.
      </p>

      <h3>Worked Example</h3>
      <p>
        Consider a salaried individual (below 60) with a gross annual income of ₹15,00,000 and ₹1,50,000 of
        Section 80C investments.
      </p>
      <p>
        <strong>New regime:</strong> Taxable income = ₹15,00,000 − ₹75,000 = ₹14,25,000. Tax = 0 (first 4L) +
        ₹20,000 (5% of 4L–8L) + ₹40,000 (10% of 8L–12L) + ₹33,750 (15% of 12L–14.25L) = ₹93,750. Adding 4%
        cess (₹3,750) gives a total tax of <strong>₹97,500</strong>.
      </p>
      <p>
        <strong>Old regime:</strong> Taxable income = ₹15,00,000 − ₹50,000 − ₹1,50,000 = ₹13,00,000. Tax =
        ₹12,500 (5% of 2.5L–5L) + ₹1,00,000 (20% of 5L–10L) + ₹90,000 (30% of 10L–13L) = ₹2,02,500. Adding 4%
        cess (₹8,100) gives a total tax of <strong>₹2,10,600</strong>.
      </p>
      <p>
        In this example, the <strong>new regime saves about ₹1,13,100</strong> per year. The old regime
        becomes competitive only when total deductions (80C + 80D + HRA + home loan interest, etc.) are
        large enough — try adjusting the deductions slider above to find your break-even point.
      </p>
    </CalculatorLayout>
  );
}

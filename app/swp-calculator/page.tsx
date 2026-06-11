import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import SwpCalculator from "@/components/calculators/SwpCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("swp-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is an SWP and how does it work?",
    answer:
      "A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount from your mutual fund investment at regular intervals (usually monthly), while the remaining corpus stays invested and continues to grow. Each withdrawal is made by redeeming units, so your balance changes based on both the withdrawals you take out and the returns the fund generates.",
  },
  {
    question: "SWP vs FD — which is better for regular income?",
    answer:
      "An FD pays a fixed interest rate and returns your full principal at maturity, but the interest is fully taxable at your slab rate. An SWP from a mutual fund offers the potential for higher returns and more tax-efficient withdrawals (since each withdrawal is part capital gain and part return of principal), but the corpus and returns are market-linked and not guaranteed. SWPs suit investors comfortable with some market risk in exchange for potentially better post-tax income.",
  },
  {
    question: "What is the '4% rule' for retirement withdrawals?",
    answer:
      "The 4% rule is a rough retirement-planning guideline suggesting that withdrawing about 4% of your retirement corpus in the first year (and adjusting that amount for inflation each year after) gives a reasonably high probability that your money will last 25–30 years. It's a starting point for planning, not a guarantee — actual sustainability depends on real returns, inflation, and how markets perform in the years right after you start withdrawing.",
  },
  {
    question: "How are SWP withdrawals taxed?",
    answer:
      "Each SWP withdrawal is treated as a partial redemption of mutual fund units, so it is split into a capital gains portion and a return-of-principal portion (which is not taxed again). For equity mutual funds, gains on units held over 12 months are long-term capital gains (LTCG), taxed at 12.5% above ₹1.25 lakh per financial year, while units held under 12 months attract short-term capital gains (STCG) at 20%. For debt mutual funds, gains are added to your income and taxed at your slab rate, regardless of the holding period.",
  },
  {
    question: "What happens if my withdrawal rate is higher than the returns?",
    answer:
      "If you withdraw more each month than your investment earns, the corpus shrinks over time — slowly at first, then faster as the balance gets smaller and earns less in absolute terms. Eventually the balance can be exhausted before your chosen time period ends. This calculator shows a warning when that happens for the inputs you've entered, so you can adjust the withdrawal amount or time period accordingly.",
  },
  {
    question: "Is SWP suitable for retirees seeking regular income?",
    answer:
      "Yes, SWPs are commonly used by retirees to create a steady monthly income stream from a lumpsum corpus (such as retirement savings or a gratuity payout), while keeping the remaining money invested for potential growth. However, since returns aren't guaranteed, it's wise to choose a conservative withdrawal rate, keep some allocation in lower-risk debt funds, and review the plan periodically based on actual fund performance.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Find out how long your investment can sustain regular monthly withdrawals, and see a year-wise breakdown of withdrawals vs. remaining balance."
      tool={<SwpCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How SWP Is Calculated</h2>
      <p>
        A Systematic Withdrawal Plan (SWP) works in reverse to a SIP. Instead of adding money every month, a
        fixed amount is withdrawn from your investment each month, while the remaining balance continues to
        earn returns. Each month, the calculation follows this recurrence:
      </p>
      <pre>
        <code>Balance(new) = Balance(old) × (1 + i) − Withdrawal</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>Balance(old)</strong> = corpus balance at the start of the month</li>
        <li><strong>i</strong> = expected monthly rate of return (annual rate ÷ 12 ÷ 100)</li>
        <li><strong>Withdrawal</strong> = the fixed amount withdrawn at the end of each month</li>
      </ul>
      <p>
        This calculation repeats for every month over the chosen time period (years × 12). If the balance
        ever drops to zero, withdrawals stop being possible from the corpus and the remaining balance is
        treated as ₹0 for the rest of the period — meaning your money has run out before the end of the
        selected duration.
      </p>
      <p>
        The <strong>Total Withdrawn</strong> is simply the sum of all monthly withdrawals you actually
        receive, and the <strong>Remaining Balance</strong> is whatever is left in the corpus at the end of
        the selected period after all withdrawals and growth are accounted for.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you invest <strong>₹10,00,000</strong> as a lumpsum and set up an SWP to withdraw{" "}
        <strong>₹8,000 every month</strong>, expecting an annual return of <strong>8%</strong>, over{" "}
        <strong>10 years</strong>. Here, i = 8% ÷ 12 ÷ 100 ≈ 0.00667, applied for 120 months, with ₹8,000
        deducted from the balance at the end of each month.
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial Investment</td>
            <td>₹10,00,000</td>
          </tr>
          <tr>
            <td>Total Withdrawn (over 10 years)</td>
            <td>₹9,60,000</td>
          </tr>
          <tr>
            <td>Remaining Balance (after 10 years)</td>
            <td>₹7,56,072</td>
          </tr>
        </tbody>
      </table>
      <p>
        Even though you withdrew ₹9,60,000 — almost the entire initial investment — the corpus still has{" "}
        <strong>₹7,56,072</strong> remaining after 10 years, because the 8% annual return on the balance
        more than offset the ₹8,000 monthly withdrawals (which work out to roughly 0.8% of the corpus per
        month, or about 9.6% per year). If the withdrawal rate had been higher than the return rate, the
        balance would have shrunk steadily instead of holding up.
      </p>
    </CalculatorLayout>
  );
}

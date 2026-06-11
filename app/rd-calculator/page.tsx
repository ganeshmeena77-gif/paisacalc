import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import RdCalculator from "@/components/calculators/RdCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("rd-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is a Recurring Deposit (RD)?",
    answer:
      "A Recurring Deposit (RD) is a savings scheme offered by banks and post offices where you deposit a fixed amount every month for a chosen tenure, and earn interest on those deposits. At the end of the tenure, you receive the total of all your deposits plus the interest earned, as a single maturity payout.",
  },
  {
    question: "What is the difference between RD and FD?",
    answer:
      "A Fixed Deposit (FD) requires a single lumpsum deposit upfront, which then earns interest for the entire tenure. A Recurring Deposit (RD) instead lets you build up savings through smaller monthly deposits, each of which earns interest only from the date it's deposited until maturity. RDs are ideal if you want to save a fixed amount regularly rather than invest a large sum at once.",
  },
  {
    question: "How is interest on an RD compounded?",
    answer:
      "Most Indian banks compound RD interest quarterly, similar to how they compound FD interest. However, because deposits are made monthly rather than as a single lumpsum, each instalment earns interest for a different length of time — the first deposit earns interest for almost the entire tenure, while the last deposit earns interest for only a short period before maturity.",
  },
  {
    question: "Can I withdraw my RD before maturity?",
    answer:
      "Most banks allow premature withdrawal of an RD, but typically charge a penalty in the form of a lower interest rate than originally agreed (often 0.5% to 1% less than the applicable rate for the period the deposit was actually held). Some banks may also restrict partial withdrawals. It's best to check your bank's specific terms before opening an RD if you think you might need the funds early.",
  },
  {
    question: "Is RD interest taxable?",
    answer:
      "Yes. Interest earned on a Recurring Deposit is fully taxable and is added to your total income under 'Income from Other Sources', taxed at your applicable income tax slab rate. Banks deduct TDS (Tax Deducted at Source) at 10% if the total RD interest from that bank exceeds ₹40,000 in a financial year (₹50,000 for senior citizens). TDS is only a provisional deduction — you must still report the full interest in your tax return and settle any difference based on your slab rate.",
  },
  {
    question: "Is an RD a good option for short-term financial goals?",
    answer:
      "Yes, RDs are well suited for short-to-medium-term goals (1-5 years) where you want predictable, guaranteed returns and the discipline of saving a fixed amount every month — for example, building an emergency fund, saving for a vacation, or accumulating a down payment. Because returns are fixed and not market-linked, RDs are lower risk than mutual funds, but typically offer lower long-term returns than equity-based options like SIPs.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Calculate the maturity value of your recurring deposit based on your monthly deposit, interest rate, and tenure, with a year-wise growth breakdown."
      tool={<RdCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How RD Maturity Value Is Calculated</h2>
      <p>
        A Recurring Deposit (RD) works like an FD, but instead of depositing a lumpsum once, you deposit a
        fixed amount every month. Each monthly deposit earns interest only from the day it's deposited until
        the RD matures — so your very first deposit earns interest for almost the entire tenure, while your
        last deposit earns interest for just a short period. Like most FDs, banks compound RD interest{" "}
        <strong>quarterly</strong>. The maturity value is calculated as:
      </p>
      <pre>
        <code>M = R × [(1 + i)^n − 1] / (1 − (1 + i)^(−1/3))</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>M</strong> = maturity value (total deposits + interest)</li>
        <li><strong>R</strong> = the fixed amount deposited every month</li>
        <li><strong>i</strong> = quarterly interest rate (annual rate ÷ 4 ÷ 100)</li>
        <li><strong>n</strong> = total number of quarters over the tenure</li>
      </ul>
      <p>
        While the formula looks technical, the underlying idea is simple: <strong>regular small deposits,
        compounded over time</strong>. The longer your RD runs and the higher the interest rate, the larger
        the gap between your total deposits and the final maturity value, since earlier deposits get more
        time to compound.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you deposit <strong>₹5,000 every month</strong> in an RD at <strong>6.5% per annum</strong>{" "}
        for <strong>5 years</strong>, with quarterly compounding (i = 6.5% ÷ 4 ÷ 100, n = 20 quarters).
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
            <td>Total Deposits (Invested)</td>
            <td>₹3,00,000</td>
          </tr>
          <tr>
            <td>Total Interest Earned</td>
            <td>₹54,954</td>
          </tr>
          <tr>
            <td>Maturity Value</td>
            <td>₹3,54,954</td>
          </tr>
        </tbody>
      </table>
      <p>
        Over 5 years, you deposit a total of ₹3,00,000 (₹5,000 × 60 months), and the RD pays out{" "}
        <strong>₹3,54,954</strong> at maturity — meaning you earn about{" "}
        <strong>₹54,954 in interest</strong> on top of your own savings, purely through quarterly
        compounding on each monthly instalment.
      </p>
    </CalculatorLayout>
  );
}

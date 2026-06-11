import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import InflationCalculator from "@/components/calculators/InflationCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("inflation-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is inflation and why does it matter for financial planning?",
    answer:
      "Inflation is the rate at which the general price level of goods and services rises over time, which means the purchasing power of your money falls. ₹100 today won't buy the same amount of goods 10 or 20 years from now. For financial planning, this matters because the amount you need for future goals — education, a house, retirement — will be much higher than what the same goal costs today.",
  },
  {
    question: "What inflation rate should I assume in this calculator?",
    answer:
      "India's long-term average consumer price inflation has been around 5-6% per year. A rate of 6% is a reasonable default for general planning, though costs for specific goals like education or healthcare have historically risen faster (8-10% or more). You can adjust the slider to see how sensitive your future cost is to different inflation assumptions.",
  },
  {
    question: "How does inflation affect retirement planning?",
    answer:
      "Retirement planning typically spans decades, so even moderate inflation compounds into a very large number. An expense of ₹50,000/month today could cost several times as much by the time you retire, and your retirement corpus needs to keep generating income that also grows with inflation throughout your retired years. Ignoring inflation is one of the most common mistakes in retirement planning, often leading to a corpus that runs out too soon.",
  },
  {
    question: "What is \"real rate of return\"?",
    answer:
      "The real rate of return is your investment return after accounting for inflation — approximately, real return = nominal return − inflation rate. For example, if your investment grows at 12% per year and inflation is 6%, your real return is roughly 6%. This is the rate at which your money's actual purchasing power grows, and it's the number that truly matters for long-term goals.",
  },
  {
    question: "How can my investments help me beat inflation?",
    answer:
      "To preserve and grow purchasing power, your investments need to earn a return higher than the inflation rate. Historically, asset classes like equity mutual funds have delivered returns well above India's long-term inflation rate over periods of 10+ years, making them suitable for long-term goals. Fixed-income instruments like FDs or savings accounts often barely keep pace with — or even lag — inflation after taxes, especially for short holding periods.",
  },
  {
    question: "How should I use this calculator to plan for future goals?",
    answer:
      "Enter the current cost of your goal (e.g., a child's college education, a wedding, or your monthly household expenses), an expected inflation rate, and the number of years until you'll need the money. The calculator shows the future cost you should plan for and the additional amount you'll need to set aside due to inflation. You can then use a SIP or lumpsum calculator to figure out how much to invest regularly to reach that future target.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Find out what today's expenses will cost in the future, and how much extra you'll need to set aside to keep pace with inflation."
      tool={<InflationCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How Future Cost Due to Inflation Is Calculated</h2>
      <p>
        Inflation steadily erodes the purchasing power of money — the same amount buys less each year. To plan
        for a future expense or goal, you need to know what it will cost when you actually need the money, not
        what it costs today. This future cost is calculated using the standard compound growth formula:
      </p>
      <pre>
        <code>FV = PV × (1 + r)^n</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>FV</strong> = future value, i.e. what the expense will cost in the future</li>
        <li><strong>PV</strong> = present value, i.e. the cost of the expense today</li>
        <li><strong>r</strong> = expected annual inflation rate (as a decimal)</li>
        <li><strong>n</strong> = number of years until the expense is incurred</li>
      </ul>
      <p>
        The difference between the future cost and today&apos;s cost is the <strong>additional amount</strong>{" "}
        you&apos;ll need to set aside — your savings or investments need to grow by at least this much just to
        maintain the same purchasing power.
      </p>
      <p>
        This is closely related to the idea of <strong>real return</strong>: real return ≈ nominal investment
        return − inflation rate. If your investments grow at the same rate as inflation, your real return is
        zero — you&apos;re no better off in terms of what your money can buy. Beating inflation by a healthy
        margin is essential for long-term financial goals like children&apos;s education, a home purchase, or
        retirement, where the gap between today&apos;s cost and the future cost can be enormous.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose something costs <strong>₹1,00,000 today</strong>, and you expect inflation of{" "}
        <strong>6% per year</strong> over the next <strong>10 years</strong>. Here, PV = ₹1,00,000, r = 0.06,
        and n = 10.
      </p>
      <p>
        FV = 1,00,000 × (1.06)<sup>10</sup> ≈ <strong>₹1,79,085</strong>
      </p>
      <p>
        So in 10 years, the same expense will cost about <strong>₹1,79,085</strong> — an{" "}
        <strong>additional ₹79,085</strong> compared to today&apos;s cost. If you&apos;re saving for this goal,
        your investments need to grow to at least ₹1,79,085 by then, which means you'll need either a higher
        monthly contribution or a return rate that comfortably exceeds the 6% inflation rate to make meaningful
        progress in real terms.
      </p>
    </CalculatorLayout>
  );
}

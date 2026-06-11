import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import StepUpSipCalculator from "@/components/calculators/StepUpSipCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("step-up-sip-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What is a step-up (top-up) SIP?",
    answer:
      "A step-up SIP, also called a top-up SIP, is a Systematic Investment Plan where you increase your monthly investment amount by a fixed percentage every year, instead of investing the same amount throughout. For example, if you start with ₹10,000/month and choose a 10% annual step-up, your instalment becomes ₹11,000/month in year 2, ₹12,100/month in year 3, and so on.",
  },
  {
    question: "Why should I increase my SIP amount every year?",
    answer:
      "Most people receive annual salary increments, so increasing your SIP in line with your income lets you invest more without straining your monthly budget. It also helps your investments keep pace with — and outgrow — inflation, since a flat SIP amount loses purchasing power over time. Stepping up your SIP can significantly accelerate wealth creation for long-term goals like retirement or your child's education.",
  },
  {
    question: "How much should I step up my SIP by each year?",
    answer:
      "A 10% annual step-up is a commonly used benchmark, as it roughly mirrors the average annual salary hike many salaried individuals receive in India. If your income grows faster, you could step up by 15% or more; if you're just starting out, even a modest 5% step-up compounds meaningfully over a long horizon.",
  },
  {
    question: "Step-up SIP vs regular SIP — which is better for long-term goals?",
    answer:
      "For long-term goals, a step-up SIP almost always builds a larger corpus than a regular SIP of the same starting amount, because your contributions grow over time while still benefiting from compounding. The longer your investment horizon, the bigger the difference — as shown in the comparison above, a 10% annual step-up can add lakhs of rupees to your final corpus over 10 years.",
  },
  {
    question: "Can I change or pause the step-up later?",
    answer:
      "Yes. Most mutual fund AMCs and investment platforms allow you to modify, pause, or stop the step-up feature on your SIP whenever needed — for instance, during a year when your income doesn't increase. You can typically adjust the step-up percentage or revert to a flat SIP amount without closing your existing investment.",
  },
  {
    question: "Is a step-up SIP suitable for beginners?",
    answer:
      "Yes. A step-up SIP is a great option for beginners, especially those early in their careers, because it lets you start with a comfortable, affordable amount and automatically increase your investment as your income grows. It builds investment discipline while ensuring your savings rate keeps up with your earning potential.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="See how increasing your SIP investment by a fixed percentage every year can accelerate your wealth creation compared to a regular, flat SIP."
      tool={<StepUpSipCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How Step-Up SIP Returns Are Calculated</h2>
      <p>
        A step-up SIP works just like a regular SIP, except that the monthly investment amount increases by a
        fixed percentage at the start of every year. So if you start with <strong>₹10,000/month</strong> and
        choose a <strong>10% annual step-up</strong>, your instalment becomes ₹11,000/month in year 2,
        ₹12,100/month in year 3, ₹13,310/month in year 4, and so on — each year&apos;s amount is 10% higher than
        the previous year&apos;s.
      </p>
      <p>
        Each month&apos;s contribution compounds for the remaining time at the expected monthly rate of return,
        following the same recurrence used for a regular SIP:
      </p>
      <pre>
        <code>FV(month) = (FV(previous month) + Contribution) × (1 + i)</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li><strong>FV</strong> = the running future value of the corpus</li>
        <li><strong>Contribution</strong> = the current monthly investment amount (increases each year by the step-up %)</li>
        <li><strong>i</strong> = expected monthly rate of return (annual rate ÷ 12 ÷ 100)</li>
      </ul>
      <p>
        Because your contributions rise roughly in line with typical income growth, a step-up SIP accelerates
        corpus growth significantly compared to a flat SIP — especially over long horizons, where the later,
        larger instalments still get many years to compound.
      </p>

      <h3>Worked Example</h3>
      <p>
        Suppose you start with <strong>₹10,000/month</strong>, expect an annual return of <strong>12%</strong>,
        invest for <strong>10 years</strong>, and step up your SIP by <strong>10% every year</strong>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Step-Up SIP (10% step-up)</th>
            <th>Regular SIP (no step-up)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Invested</td>
            <td>₹19,12,491</td>
            <td>₹12,00,000</td>
          </tr>
          <tr>
            <td>Estimated Returns</td>
            <td>₹14,61,835</td>
            <td>₹11,23,391</td>
          </tr>
          <tr>
            <td>Total Value</td>
            <td>₹33,74,326</td>
            <td>₹23,23,391</td>
          </tr>
        </tbody>
      </table>
      <p>
        With a 10% annual step-up, your total investment over 10 years works out to <strong>₹19,12,491</strong>,
        which grows to a final corpus of <strong>₹33,74,326</strong> — an estimated return of about{" "}
        <strong>₹14,61,835</strong>. By comparison, a regular SIP of ₹10,000/month at the same 12% return for 10
        years would total only <strong>₹23,23,391</strong>. That means stepping up your SIP yields about{" "}
        <strong>₹10,50,935 more</strong> than a flat SIP of the same starting amount, even though your total
        contribution is also higher — illustrating how rising your investments alongside your income can
        meaningfully accelerate long-term wealth creation.
      </p>
    </CalculatorLayout>
  );
}

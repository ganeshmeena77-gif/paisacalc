import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import GstCalculator from "@/components/calculators/GstCalculator";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

const meta = getCalculatorBySlug("gst-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description },
};

const faqs = [
  {
    question: "What are the GST slabs in India?",
    answer:
      "Goods and Services Tax (GST) in India is primarily levied at five slabs: 0% (exempt items like fresh fruits, vegetables, and unbranded food grains), 5%, 12%, 18% (the most common rate, applicable to most goods and services), and 28% (luxury and sin goods like high-end cars, tobacco, and aerated drinks). A few special lower rates, such as 0.25% on rough diamonds and 3% on gold and jewellery, also exist for specific categories.",
  },
  {
    question: "What is the difference between CGST, SGST, and IGST?",
    answer:
      "For an intra-state sale (buyer and seller in the same state), GST is split equally into CGST (Central GST) and SGST (State GST) — each gets 50% of the total GST amount, going to the central and state governments respectively. For an inter-state sale, the entire GST amount is collected as IGST (Integrated GST) by the central government, which is later apportioned between the centre and the destination state.",
  },
  {
    question: "How do I remove GST from a price that already includes GST?",
    answer:
      "If a price already includes GST, you can find the original base price using: Base Amount = Total Amount ÷ (1 + GST Rate / 100). For example, an MRP of ₹11,800 that includes 18% GST has a base price of ₹11,800 ÷ 1.18 = ₹10,000, with ₹1,800 being the GST component. Select 'Remove GST' mode in the calculator above and enter the GST-inclusive amount to do this automatically.",
  },
  {
    question: "Which goods and services are exempt from GST?",
    answer:
      "Several essential items are exempt from GST (taxed at 0%), including fresh fruits and vegetables, unbranded cereals and food grains, milk, fresh meat and fish, books, and certain healthcare and educational services. Exemptions and rates are periodically reviewed by the GST Council, so it's a good idea to check the latest notifications for the exact category you're dealing with.",
  },
  {
    question: "Is this calculator accurate for all product categories?",
    answer:
      "This calculator applies a flat GST rate that you select (0%, 5%, 12%, 18%, or 28%) to the amount entered, which covers the vast majority of everyday transactions. However, certain goods and services have special rates (such as 0.25% on rough diamonds, 3% on gold, or compensation cess on items like tobacco and luxury cars) that aren't covered by the standard slabs. For such categories, refer to the specific GST notification applicable to that product.",
  },
  {
    question: "What is the GST rate for restaurants and hotels?",
    answer:
      "GST on restaurants generally varies by category — many standalone, non-AC and AC restaurants are taxed at 5% without the benefit of input tax credit (ITC), while restaurants located within higher-tariff hotels can attract 18% with ITC. Hotel accommodation is taxed based on the room tariff, with rates ranging from nil for low-tariff rooms up to 18% or more for premium rooms. Because these rates depend on tariff thresholds and can be revised, it's best to verify the current applicable rate for your specific establishment before relying on this calculator for such cases.",
  },
];

export default function Page() {
  return (
    <CalculatorLayout
      title={meta.title}
      intro="Quickly add or remove GST at 5%, 12%, 18%, or 28% from any amount, and see the CGST/SGST split."
      tool={<GstCalculator />}
      faqs={faqs}
      relatedSlugs={meta.related}
    >
      <h2>How GST Is Calculated</h2>
      <p>
        Goods and Services Tax (GST) is an indirect tax applied to the supply of goods and services in
        India. Depending on whether the amount you have is the base price or already includes GST, you can
        either <strong>add</strong> GST on top or <strong>remove</strong> it to find the original price.
      </p>

      <h3>Add GST (price excludes GST)</h3>
      <pre>
        <code>GST Amount = Amount × (Rate / 100)</code>
        <br />
        <code>Total Amount = Amount + GST Amount</code>
      </pre>
      <p>
        This is used when you have the base selling price and need to calculate the final price the
        customer pays after adding GST.
      </p>

      <h3>Remove GST (price includes GST)</h3>
      <pre>
        <code>Base Amount = Amount / (1 + Rate / 100)</code>
        <br />
        <code>GST Amount = Amount − Base Amount</code>
      </pre>
      <p>
        This is used when the amount you have (such as the MRP) already includes GST, and you want to find
        out the base price and the GST component embedded within it.
      </p>

      <h3>GST Slab Structure</h3>
      <p>
        India follows a multi-tier GST structure with standard slabs of <strong>0%, 5%, 12%, 18%, and
        28%</strong>. Most everyday goods and services fall under the 5%, 12%, or 18% slabs, while luxury
        and sin goods (like premium cars, tobacco, and aerated beverages) attract 28%, often with an
        additional compensation cess. A handful of special rates also apply — for instance,{" "}
        <strong>0.25%</strong> on rough precious and semi-precious stones, and <strong>3%</strong> on gold,
        silver, and jewellery.
      </p>

      <h3>CGST + SGST vs IGST</h3>
      <p>
        For an <strong>intra-state</strong> transaction (buyer and seller in the same state), the total GST
        is split equally between <strong>CGST (Central GST)</strong> and <strong>SGST (State GST)</strong> —
        each accounts for 50% of the total GST amount. For an <strong>inter-state</strong> transaction, the
        full GST amount is charged as a single <strong>IGST (Integrated GST)</strong>, which is later
        divided between the central and state governments.
      </p>

      <h3>Worked Examples</h3>
      <p>
        <strong>Adding GST:</strong> For a base amount of <strong>₹10,000</strong> at <strong>18%</strong>{" "}
        GST, the GST amount = ₹10,000 × 0.18 = <strong>₹1,800</strong>, and the total payable =
        ₹10,000 + ₹1,800 = <strong>₹11,800</strong>. For an intra-state sale, this ₹1,800 splits into{" "}
        <strong>CGST = ₹900</strong> and <strong>SGST = ₹900</strong>.
      </p>
      <p>
        <strong>Removing GST:</strong> If a product's GST-inclusive price is <strong>₹11,800</strong> at{" "}
        <strong>18%</strong> GST, the base amount = ₹11,800 / 1.18 = <strong>₹10,000</strong>, and the GST
        amount embedded in that price = ₹11,800 − ₹10,000 = <strong>₹1,800</strong>.
      </p>
    </CalculatorLayout>
  );
}

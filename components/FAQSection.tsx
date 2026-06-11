import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

/** Renders an accordion of FAQs plus matching FAQPage JSON-LD for SEO. */
export default function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
      <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-800 marker:hidden">
              {faq.question}
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

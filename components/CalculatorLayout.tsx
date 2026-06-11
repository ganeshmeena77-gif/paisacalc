import type { ReactNode } from "react";
import FAQSection, { type FAQItem } from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";

interface CalculatorLayoutProps {
  title: string;
  intro: string;
  /** The interactive calculator widget (client component). */
  tool: ReactNode;
  /** Long-form "how it's calculated" explanation with formula + example. */
  children: ReactNode;
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export default function CalculatorLayout({
  title,
  intro,
  tool,
  children,
  faqs,
  relatedSlugs,
}: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base text-slate-600 sm:text-lg">{intro}</p>
      </header>

      <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">{tool}</div>

      <article className="prose prose-slate mb-12 max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-lg prose-a:text-brand-600">
        {children}
      </article>

      <div className="mb-12">
        <FAQSection faqs={faqs} />
      </div>

      <RelatedCalculators slugs={relatedSlugs} />
    </div>
  );
}

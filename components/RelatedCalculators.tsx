import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCalculatorBySlug } from "@/lib/calculatorMeta";

export default function RelatedCalculators({ slugs }: { slugs: string[] }) {
  const items = slugs.map(getCalculatorBySlug).filter((item) => item !== undefined);
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">Related Calculators</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-brand-200 hover:bg-brand-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-slate-800">{item.shortTitle}</span>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-600" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

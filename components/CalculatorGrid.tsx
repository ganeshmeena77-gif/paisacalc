"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { calculators, type CalculatorMeta } from "@/lib/calculatorMeta";

const categories = Array.from(new Set(calculators.map((c) => c.category)));

export default function CalculatorGrid() {
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? calculators.filter(
        (c) =>
          c.shortTitle.toLowerCase().includes(normalized) ||
          c.description.toLowerCase().includes(normalized) ||
          c.category.toLowerCase().includes(normalized)
      )
    : [];

  return (
    <div>
      <div className="mx-auto mb-10 max-w-xl">
        <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 shadow-sm focus-within:border-brand-400">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search calculators... (e.g. SIP, EMI, tax)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {normalized ? (
        filtered.length > 0 ? (
          <CalculatorCardGrid items={filtered} />
        ) : (
          <p className="text-center text-slate-500">No calculators found for &ldquo;{query}&rdquo;.</p>
        )
      ) : (
        categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-slate-900">{category}</h2>
            <CalculatorCardGrid items={calculators.filter((c) => c.category === category)} />
          </div>
        ))
      )}
    </div>
  );
}

function CalculatorCardGrid({ items }: { items: CalculatorMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-semibold text-slate-900">{c.shortTitle}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">{c.description}</p>
          </Link>
        );
      })}
    </div>
  );
}

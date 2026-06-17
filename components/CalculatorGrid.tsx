"use client";

import { useState } from "react";
import Link from "next/link";
import { calculators, type CalculatorMeta } from "@/lib/calculatorMeta";

const categories = Array.from(new Set(calculators.map((c) => c.category)));

interface CalculatorGridProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function CalculatorGrid({ query, setQuery }: CalculatorGridProps) {
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
      {normalized ? (
        filtered.length > 0 ? (
          <CalculatorCardGrid items={filtered} />
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400">No calculators found for &ldquo;{query}&rdquo;.</p>
        )
      ) : (
        categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">{category}</h2>
            <CalculatorCardGrid items={calculators.filter((c) => c.category === category)} />
          </div>
        ))
      )}
    </div>
  );
}

function CalculatorCardGrid({ items }: { items: CalculatorMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group relative overflow-hidden flex flex-col rounded-2xl border border-slate-100 bg-white/70 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-indigo-600 dark:hover:bg-slate-800"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-indigo-950 dark:to-transparent"></div>
            
            <div className="relative z-10">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-teal-50 text-indigo-600 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-lg dark:from-indigo-900 dark:to-teal-900 dark:text-indigo-400 dark:group-hover:from-indigo-600 dark:group-hover:to-indigo-700 dark:group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors dark:text-slate-100 dark:group-hover:text-indigo-400">{c.shortTitle}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600 group-hover:text-slate-700 transition-colors dark:text-slate-400 dark:group-hover:text-slate-300">{c.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

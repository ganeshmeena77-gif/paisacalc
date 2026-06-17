"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Check } from "lucide-react";
import { calculators, type CalculatorMeta } from "@/lib/calculatorMeta";

const categories = Array.from(new Set(calculators.map((c) => c.category)));

export default function CalculatorGrid() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? calculators.filter(
        (c) =>
          c.shortTitle.toLowerCase().includes(normalized) ||
          c.description.toLowerCase().includes(normalized) ||
          c.category.toLowerCase().includes(normalized)
      )
    : [];

  // Get unique suggestions from filtered results
  const suggestions = filtered.slice(0, 5).map((c) => c.shortTitle);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div>
      <div className="mx-auto mb-6 max-w-2xl">
        <div className="relative">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur px-5 py-3 shadow-md transition-all focus-within:border-brand-400 focus-within:shadow-lg hover:border-slate-300">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Search calculators... (e.g. SIP, EMI, tax)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => query && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 transition-colors"
            />
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden z-10">
              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-5 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-600 flex items-center justify-between transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <span className="font-medium">{suggestion}</span>
                    <Check className="h-4 w-4 text-brand-500 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          )}
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
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">{category}</h2>
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
            className="group relative overflow-hidden flex flex-col rounded-2xl border border-slate-100 bg-white/70 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:bg-white"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="relative z-10">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-blue-50 text-brand-600 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white group-hover:shadow-lg">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{c.shortTitle}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">{c.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

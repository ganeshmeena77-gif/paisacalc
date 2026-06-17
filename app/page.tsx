"use client";

import { useState } from "react";
import { Search, Check } from "lucide-react";
import { calculators } from "@/lib/calculatorMeta";
import CalculatorGrid from "@/components/CalculatorGrid";

export default function Home() {
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

  const suggestions = filtered.slice(0, 5).map((c) => c.shortTitle);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-16 sm:py-24">
        {/* Background gradient orb */}
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 opacity-10 blur-3xl"></div>
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tr from-pink-300 to-purple-400 opacity-10 blur-3xl"></div>

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2">
            <span className="text-sm font-semibold text-blue-600">✨ 15 Free Calculators</span>
          </div>
          <h1 className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Indian Financial Calculators
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            Income tax, SIP, EMI, GST, PPF, gratuity and more — updated for FY 2026-27. No login, no signup, just instant results.
          </p>

          {/* Search Bar in Hero */}
          <div className="relative mx-auto mt-10 max-w-xl">
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
              <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden z-20">
                <div className="max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-5 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-600 flex items-center justify-between transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <span className="font-medium">{suggestion}</span>
                      <Check className="h-4 w-4 text-brand-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calculators Grid Section */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <CalculatorGrid query={query} setQuery={setQuery} />
      </div>
    </div>
  );
}

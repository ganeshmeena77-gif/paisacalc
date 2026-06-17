"use client";

import { useState, useEffect } from "react";
import { Search, Check } from "lucide-react";
import { calculators } from "@/lib/calculatorMeta";
import CalculatorGrid from "@/components/CalculatorGrid";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className={`mb-6 inline-block rounded-full bg-gradient-to-r from-indigo-100 to-teal-100 px-4 py-2 transition-all duration-300 ${isScrolled ? "opacity-0 hidden" : "opacity-100"} dark:from-indigo-900 dark:to-teal-900`}>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">✨ 15 Free Calculators</span>
          </div>
          <h1 className="bg-gradient-to-r from-indigo-900 via-indigo-600 to-teal-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl dark:from-indigo-400 dark:via-indigo-300 dark:to-teal-400">
            Indian Financial Calculators
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl dark:text-slate-300">
            Income tax, SIP, EMI, GST, PPF, gratuity and more — updated for FY 2026-27. No login, no signup, just instant results.
          </p>

          {/* Search Bar in Hero */}
          <div className="relative mx-auto mt-10 max-w-xl">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur px-5 py-3 shadow-md transition-all focus-within:border-indigo-400 focus-within:shadow-lg hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/80 dark:focus-within:border-indigo-500 dark:hover:border-slate-600">
              <Search className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500" />
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
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 transition-colors dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden z-20 dark:border-slate-700 dark:bg-slate-800">
                <div className="max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-5 py-3 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between transition-colors border-b border-slate-100 last:border-b-0 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-indigo-400 dark:border-slate-700"
                    >
                      <span className="font-medium">{suggestion}</span>
                      <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
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

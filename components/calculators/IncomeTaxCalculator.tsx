"use client";

import { useMemo, useState } from "react";
import { calculateIncomeTax, type AgeGroup, type FiscalYear, type IncomeTaxResult } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DataTable from "@/components/DataTable";

const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: "below60", label: "Below 60" },
  { value: "60to80", label: "60 – 80 (Senior)" },
  { value: "above80", label: "Above 80 (Super Senior)" },
];

const FISCAL_YEARS: { value: FiscalYear; label: string; ayLabel: string }[] = [
  { value: "2026-27", label: "FY 2026-27", ayLabel: "AY 2027-28" },
  { value: "2025-26", label: "FY 2025-26", ayLabel: "AY 2026-27" },
];

export default function IncomeTaxCalculator() {
  const [fiscalYear, setFiscalYear] = useState<FiscalYear>("2026-27");
  const [income, setIncome] = useState(1200000);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
  const [deductions, setDeductions] = useState(150000);

  const newRegime = useMemo(
    () => calculateIncomeTax(income, "new", ageGroup, 0, fiscalYear),
    [income, ageGroup, fiscalYear]
  );
  const oldRegime = useMemo(
    () => calculateIncomeTax(income, "old", ageGroup, deductions, fiscalYear),
    [income, ageGroup, deductions, fiscalYear]
  );

  const better = newRegime.totalTax <= oldRegime.totalTax ? "new" : "old";
  const savings = Math.abs(newRegime.totalTax - oldRegime.totalTax);
  const selectedFY = FISCAL_YEARS.find((f) => f.value === fiscalYear)!;

  return (
    <div className="space-y-6">
      {/* Fiscal Year Selector */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
        <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Select Assessment Year</p>
        <div className="flex flex-wrap gap-3">
          {FISCAL_YEARS.map((fy) => (
            <button
              key={fy.value}
              onClick={() => setFiscalYear(fy.value)}
              className={`flex flex-col items-start rounded-xl border px-5 py-3 text-left transition ${
                fiscalYear === fy.value
                  ? "border-brand-500 bg-brand-600 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500"
              }`}
            >
              <span className="text-base font-bold">{fy.label}</span>
              <span className={`text-xs ${fiscalYear === fy.value ? "text-indigo-200" : "text-slate-400"}`}>
                {fy.ayLabel}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <SliderInput
          label="Annual Gross Income (CTC / salary before deductions)"
          value={income}
          onChange={setIncome}
          min={300000}
          max={10000000}
          step={10000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Total Deductions for Old Regime (80C, 80D, HRA, home loan interest, etc.)"
          value={deductions}
          onChange={setDeductions}
          min={0}
          max={500000}
          step={5000}
          prefix="₹"
          formatValue
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Age Group (affects Old Regime exemption limit)</p>
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((a) => (
            <button
              key={a.value}
              onClick={() => setAgeGroup(a.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                ageGroup === a.value
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <RegimeCard title={`New Regime (${selectedFY.label})`} result={newRegime} highlight={better === "new"} />
        <RegimeCard title="Old Regime" result={oldRegime} highlight={better === "old"} />
      </div>

      <div className="rounded-xl bg-positive-50 p-4 text-center text-sm font-medium text-positive-600">
        The {better === "new" ? "New" : "Old"} Regime saves you {formatINR(savings)} per year compared
        to the other regime, based on the inputs above.
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SlabTable title={`New Regime — Slab-wise Tax (${selectedFY.label})`} result={newRegime} />
        <SlabTable title="Old Regime — Slab-wise Tax" result={oldRegime} />
      </div>
    </div>
  );
}

function RegimeCard({
  title,
  result,
  highlight,
}: {
  title: string;
  result: IncomeTaxResult;
  highlight: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-brand-300 bg-brand-50" : "border-slate-200"}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {highlight && (
          <span className="rounded-full bg-positive-500 px-2 py-0.5 text-xs font-semibold text-white">
            Lower Tax
          </span>
        )}
      </div>
      <div className="space-y-3">
        <ResultStat label="Taxable Income" value={formatINR(result.taxableIncome)} />
        <ResultStat label="Total Tax Payable (incl. cess)" value={formatINR(result.totalTax)} accent="brand" size="lg" />
        <div className="grid grid-cols-2 gap-3">
          <ResultStat label="In-Hand (Annual)" value={formatINR(result.takeHomeAnnual)} accent="positive" />
          <ResultStat label="In-Hand (Monthly)" value={formatINR(result.takeHomeAnnual / 12)} accent="positive" />
        </div>
      </div>
    </div>
  );
}

function SlabTable({ title, result }: { title: string; result: IncomeTaxResult }) {
  const rows = result.slabBreakdown.map((slab) => ({
    range:
      slab.upTo === Infinity
        ? `Above ${formatCompactINR(slab.from)}`
        : `${formatCompactINR(slab.from)} – ${formatCompactINR(slab.upTo)}`,
    rate: `${slab.rate}%`,
    tax: slab.taxAmount,
  }));

  if (rows.length === 0) {
    rows.push({ range: "—", rate: "0%", tax: 0 });
  }

  return (
    <DataTable
      caption={title}
      columns={[
        { key: "range", label: "Slab" },
        { key: "rate", label: "Rate" },
        { key: "tax", label: "Tax", align: "right", format: (v) => formatINR(v as number) },
      ]}
      rows={rows}
    />
  );
}

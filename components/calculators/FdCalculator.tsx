"use client";

import { useMemo, useState } from "react";
import { calculateFD } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

const COMPOUNDING_OPTIONS: { value: 1 | 2 | 4 | 12; label: string }[] = [
  { value: 4, label: "Quarterly" },
  { value: 2, label: "Half-Yearly" },
  { value: 1, label: "Annually" },
  { value: 12, label: "Monthly" },
];

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState<1 | 2 | 4 | 12>(4);

  const result = useMemo(
    () => calculateFD(principal, rate, years, compounding),
    [principal, rate, years, compounding]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Deposit Amount"
          value={principal}
          onChange={setPrincipal}
          min={1000}
          max={5000000}
          step={1000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
          min={3}
          max={10}
          step={0.1}
          suffix="%"
        />
        <SliderInput label="Tenure" value={years} onChange={setYears} min={1} max={10} step={1} suffix=" yrs" />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Compounding Frequency</p>
        <div className="flex flex-wrap gap-2">
          {COMPOUNDING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCompounding(opt.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                compounding === opt.value
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Principal Amount" value={formatINR(result.investedAmount)} />
        <ResultStat label="Total Interest Earned" value={formatINR(result.estimatedReturns)} accent="positive" />
        <ResultStat label="Maturity Value" value={formatINR(result.totalValue)} accent="brand" size="lg" />
      </div>

      <DonutChart
        segments={[
          { label: "Principal", value: result.investedAmount, color: "#2563eb" },
          { label: "Interest Earned", value: result.estimatedReturns, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.totalValue)}
        centerLabel="Maturity Value"
      />

      <DataTable
        caption="Year-wise Growth"
        columns={[
          { key: "year", label: "Year" },
          { key: "invested", label: "Principal", align: "right", format: (v) => formatINR(v as number) },
          { key: "returns", label: "Interest Earned", align: "right", format: (v) => formatINR(v as number) },
          { key: "totalValue", label: "Maturity Value", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={result.yearWise}
      />
    </div>
  );
}

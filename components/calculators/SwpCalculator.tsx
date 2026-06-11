"use client";

import { useMemo, useState } from "react";
import { calculateSWP } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

export default function SwpCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(8000);
  const [returnRate, setReturnRate] = useState(8);
  const [years, setYears] = useState(10);

  const result = useMemo(
    () => calculateSWP(initialInvestment, monthlyWithdrawal, returnRate, years),
    [initialInvestment, monthlyWithdrawal, returnRate, years]
  );

  const isExhausted = result.finalValue <= 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SliderInput
          label="Total Investment"
          value={initialInvestment}
          onChange={setInitialInvestment}
          min={100000}
          max={50000000}
          step={10000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Monthly Withdrawal"
          value={monthlyWithdrawal}
          onChange={setMonthlyWithdrawal}
          min={1000}
          max={500000}
          step={500}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Expected Annual Return"
          value={returnRate}
          onChange={setReturnRate}
          min={1}
          max={15}
          step={0.5}
          suffix="%"
        />
        <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" yrs" />
      </div>

      {isExhausted && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Your corpus gets fully exhausted before the end of the selected period at this withdrawal rate. Consider
          lowering the monthly withdrawal, increasing the expected return, or starting with a larger investment.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Total Investment" value={formatINR(result.totalInvestment)} />
        <ResultStat label="Total Withdrawn" value={formatINR(result.totalWithdrawn)} accent="positive" />
        <ResultStat label="Remaining Balance" value={formatINR(result.finalValue)} accent="brand" size="lg" />
      </div>

      <DonutChart
        segments={[
          { label: "Total Withdrawn", value: result.totalWithdrawn, color: "#16a34a" },
          { label: "Remaining Balance", value: Math.max(0, result.finalValue), color: "#2563eb" },
        ]}
        centerValue={formatCompactINR(result.totalInvestment)}
        centerLabel="Initial Investment"
      />

      <DataTable
        caption="Year-wise Balance"
        columns={[
          { key: "year", label: "Year" },
          {
            key: "withdrawn",
            label: "Total Withdrawn",
            align: "right",
            format: (v) => formatINR(v as number),
          },
          {
            key: "balance",
            label: "Remaining Balance",
            align: "right",
            format: (v) => formatINR(v as number),
          },
        ]}
        rows={result.yearWise}
      />
    </div>
  );
}

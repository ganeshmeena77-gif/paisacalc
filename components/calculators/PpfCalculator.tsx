"use client";

import { useMemo, useState } from "react";
import { calculatePPF } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

export default function PpfCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(7.1);

  const result = useMemo(
    () => calculatePPF(yearlyInvestment, years, rate),
    [yearlyInvestment, years, rate]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Yearly Investment"
          value={yearlyInvestment}
          onChange={setYearlyInvestment}
          min={500}
          max={150000}
          step={500}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Time Period"
          value={years}
          onChange={setYears}
          min={15}
          max={50}
          step={1}
          suffix=" yrs"
        />
        <SliderInput
          label="Interest Rate (currently 7.1% for Apr–Jun 2026, revised quarterly by the government)"
          value={rate}
          onChange={setRate}
          min={6}
          max={9}
          step={0.1}
          suffix="%"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Total Investment" value={formatINR(result.investedAmount)} />
        <ResultStat label="Total Interest Earned" value={formatINR(result.estimatedReturns)} accent="positive" />
        <ResultStat label="Maturity Value" value={formatINR(result.totalValue)} accent="brand" size="lg" />
      </div>

      <DonutChart
        segments={[
          { label: "Total Investment", value: result.investedAmount, color: "#2563eb" },
          { label: "Total Interest", value: result.estimatedReturns, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.totalValue)}
        centerLabel="Maturity Value"
      />

      <DataTable
        caption="Year-wise Growth"
        columns={[
          { key: "year", label: "Year" },
          { key: "invested", label: "Total Invested", align: "right", format: (v) => formatINR(v as number) },
          { key: "returns", label: "Interest Earned", align: "right", format: (v) => formatINR(v as number) },
          { key: "totalValue", label: "Balance", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={result.yearWise}
      />
    </div>
  );
}

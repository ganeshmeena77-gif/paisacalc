"use client";

import { useMemo, useState } from "react";
import { calculateRD } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

export default function RdCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(5);

  const result = useMemo(() => calculateRD(monthlyDeposit, rate, years), [monthlyDeposit, rate, years]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Monthly Deposit"
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          min={100}
          max={100000}
          step={100}
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

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Total Deposits" value={formatINR(result.investedAmount)} />
        <ResultStat label="Total Interest Earned" value={formatINR(result.estimatedReturns)} accent="positive" />
        <ResultStat label="Maturity Value" value={formatINR(result.totalValue)} accent="brand" size="lg" />
      </div>

      <DonutChart
        segments={[
          { label: "Total Deposits", value: result.investedAmount, color: "#2563eb" },
          { label: "Total Interest", value: result.estimatedReturns, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.totalValue)}
        centerLabel="Maturity Value"
      />

      <DataTable
        caption="Year-wise Growth"
        columns={[
          { key: "year", label: "Year" },
          { key: "invested", label: "Total Deposited", align: "right", format: (v) => formatINR(v as number) },
          { key: "returns", label: "Interest Earned", align: "right", format: (v) => formatINR(v as number) },
          { key: "totalValue", label: "Maturity Value", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={result.yearWise}
      />
    </div>
  );
}

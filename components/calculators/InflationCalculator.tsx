"use client";

import { useMemo, useState } from "react";
import { calculateInflation } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [inflationRate, setInflationRate] = useState(6);
  const [years, setYears] = useState(10);

  const result = useMemo(
    () => calculateInflation(amount, inflationRate, years),
    [amount, inflationRate, years]
  );

  const additionalAmount = result.futureCost - amount;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Current Cost / Amount"
          value={amount}
          onChange={setAmount}
          min={1000}
          max={10000000}
          step={1000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Expected Inflation Rate"
          value={inflationRate}
          onChange={setInflationRate}
          min={2}
          max={12}
          step={0.5}
          suffix="%"
        />
        <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Current Value" value={formatINR(amount)} />
        <ResultStat label="Future Cost" value={formatINR(result.futureCost)} accent="brand" size="lg" />
        <ResultStat label="Additional Amount Needed" value={formatINR(additionalAmount)} accent="positive" />
      </div>

      <DonutChart
        segments={[
          { label: "Today's Value", value: amount, color: "#2563eb" },
          { label: "Additional Cost Due to Inflation", value: additionalAmount, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.futureCost)}
        centerLabel="Future Cost"
      />

      <DataTable
        caption="Year-wise Future Cost"
        columns={[
          { key: "year", label: "Year" },
          { key: "futureCost", label: "Future Cost", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={result.yearWise}
      />
    </div>
  );
}

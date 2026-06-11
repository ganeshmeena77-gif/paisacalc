"use client";

import { useMemo, useState } from "react";
import { calculateLumpsum } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateLumpsum(principal, returnRate, years), [principal, returnRate, years]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Investment Amount"
          value={principal}
          onChange={setPrincipal}
          min={1000}
          max={10000000}
          step={1000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Expected Annual Return"
          value={returnRate}
          onChange={setReturnRate}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
        />
        <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Invested Amount" value={formatINR(result.investedAmount)} />
        <ResultStat label="Estimated Returns" value={formatINR(result.estimatedReturns)} accent="positive" />
        <ResultStat label="Total Value" value={formatINR(result.totalValue)} accent="brand" size="lg" />
      </div>

      <DonutChart
        segments={[
          { label: "Invested Amount", value: result.investedAmount, color: "#2563eb" },
          { label: "Estimated Returns", value: result.estimatedReturns, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.totalValue)}
        centerLabel="Total Value"
      />

      <DataTable
        caption="Year-wise Growth"
        columns={[
          { key: "year", label: "Year" },
          { key: "invested", label: "Invested", align: "right", format: (v) => formatINR(v as number) },
          { key: "returns", label: "Returns", align: "right", format: (v) => formatINR(v as number) },
          { key: "totalValue", label: "Total Value", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={result.yearWise}
      />
    </div>
  );
}

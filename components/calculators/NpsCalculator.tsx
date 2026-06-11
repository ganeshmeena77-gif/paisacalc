"use client";

import { useMemo, useState } from "react";
import { calculateNPS } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

export default function NpsCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [returnRate, setReturnRate] = useState(10);
  const [annuityPercent, setAnnuityPercent] = useState(40);
  const [annuityRate, setAnnuityRate] = useState(6);

  const effectiveRetirementAge = Math.max(retirementAge, currentAge + 1);

  const result = useMemo(
    () =>
      calculateNPS(
        monthlyContribution,
        currentAge,
        effectiveRetirementAge,
        returnRate,
        annuityPercent,
        annuityRate
      ),
    [monthlyContribution, currentAge, effectiveRetirementAge, returnRate, annuityPercent, annuityRate]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Current Age"
          value={currentAge}
          onChange={setCurrentAge}
          min={18}
          max={60}
          step={1}
          suffix=" yrs"
        />
        <SliderInput
          label="Retirement Age"
          value={effectiveRetirementAge}
          onChange={setRetirementAge}
          min={60}
          max={70}
          step={1}
          suffix=" yrs"
        />
        <SliderInput
          label="Monthly Contribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          min={500}
          max={100000}
          step={500}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Expected Return (Equity/Corporate Bond mix)"
          value={returnRate}
          onChange={setReturnRate}
          min={5}
          max={15}
          step={0.5}
          suffix="%"
        />
        <SliderInput
          label="Annuity Purchase %"
          value={annuityPercent}
          onChange={setAnnuityPercent}
          min={40}
          max={100}
          step={5}
          suffix="%"
        />
        <SliderInput
          label="Expected Annuity Rate"
          value={annuityRate}
          onChange={setAnnuityRate}
          min={4}
          max={8}
          step={0.25}
          suffix="%"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultStat label="Total Investment" value={formatINR(result.totalInvestment)} />
        <ResultStat label="Total Corpus at Retirement" value={formatINR(result.totalCorpus)} accent="brand" size="lg" />
        <ResultStat label="Lumpsum Withdrawal (Tax-Free)" value={formatINR(result.lumpsumAmount)} accent="positive" />
        <ResultStat label="Estimated Monthly Pension" value={formatINR(result.monthlyPension)} accent="positive" />
      </div>

      <DonutChart
        segments={[
          { label: "Lumpsum Withdrawal", value: result.lumpsumAmount, color: "#2563eb" },
          { label: "Annuity Corpus", value: result.annuityCorpus, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.totalCorpus)}
        centerLabel="Total Corpus"
      />

      <DataTable
        caption="Year-wise Corpus Growth"
        columns={[
          { key: "year", label: "Year" },
          { key: "invested", label: "Invested", align: "right", format: (v) => formatINR(v as number) },
          { key: "returns", label: "Growth", align: "right", format: (v) => formatINR(v as number) },
          { key: "totalValue", label: "Corpus", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={result.yearWise}
      />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calculateGratuity } from "@/lib/calculators";
import { formatINR, formatCompactINR, formatNumber } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";

export default function GratuityCalculator() {
  const [basicPlusDA, setBasicPlusDA] = useState(50000);
  const [yearsOfService, setYearsOfService] = useState(12.6);
  const [coveredUnderAct, setCoveredUnderAct] = useState(true);

  const result = useMemo(
    () => calculateGratuity(basicPlusDA, yearsOfService, coveredUnderAct),
    [basicPlusDA, yearsOfService, coveredUnderAct]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <SliderInput
          label="Last Drawn Basic Salary + DA (Monthly)"
          value={basicPlusDA}
          onChange={setBasicPlusDA}
          min={5000}
          max={500000}
          step={500}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Years of Service"
          value={yearsOfService}
          onChange={setYearsOfService}
          min={1}
          max={40}
          step={0.1}
          suffix=" yrs"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Covered under the Payment of Gratuity Act, 1972?
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCoveredUnderAct(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              coveredUnderAct ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => setCoveredUnderAct(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              !coveredUnderAct ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            No
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Gratuity Amount" value={formatINR(result.gratuityAmount)} accent="brand" size="lg" />
        <ResultStat label="Tax-Exempt Amount" value={formatINR(result.taxExemptAmount)} accent="positive" />
        <ResultStat label="Taxable Amount" value={formatINR(result.taxableAmount)} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        Years considered for calculation: <strong>{formatNumber(result.yearsConsidered, 0)}</strong>.{" "}
        {coveredUnderAct
          ? "For employees covered under the Payment of Gratuity Act, a remainder of 6 months or more in the final year of service is rounded up to a full year (and rounded down otherwise)."
          : "For employees not covered under the Act, the years of service entered are used as-is."}
      </div>

      <DonutChart
        segments={[
          { label: "Tax-Exempt Amount", value: result.taxExemptAmount, color: "#16a34a" },
          { label: "Taxable Amount", value: result.taxableAmount, color: "#2563eb" },
        ]}
        centerValue={formatCompactINR(result.gratuityAmount)}
        centerLabel="Total Gratuity"
      />
    </div>
  );
}

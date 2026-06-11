"use client";

import { useMemo, useState } from "react";
import { calculateHRAExemption } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";

export default function HraCalculator() {
  const [basicPlusDA, setBasicPlusDA] = useState(40000);
  const [hraReceived, setHraReceived] = useState(20000);
  const [rentPaid, setRentPaid] = useState(18000);
  const [isMetro, setIsMetro] = useState(true);

  const result = useMemo(
    () => calculateHRAExemption(basicPlusDA, hraReceived, rentPaid, isMetro),
    [basicPlusDA, hraReceived, rentPaid, isMetro]
  );

  const conditions = [
    {
      key: "actual",
      label: "Actual HRA Received",
      value: result.actualHRA,
    },
    {
      key: "rent",
      label: "Rent Paid − 10% of Basic+DA",
      value: result.rentMinusTenPercent,
    },
    {
      key: "metro",
      label: `${isMetro ? "50%" : "40%"} of Basic+DA (${isMetro ? "metro" : "non-metro"})`,
      value: result.metroLimit,
    },
  ];

  const totalAnnualHRA = hraReceived * 12;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Basic Salary + DA (Monthly)"
          value={basicPlusDA}
          onChange={setBasicPlusDA}
          min={5000}
          max={300000}
          step={500}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="HRA Received (Monthly)"
          value={hraReceived}
          onChange={setHraReceived}
          min={0}
          max={150000}
          step={500}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Rent Paid (Monthly)"
          value={rentPaid}
          onChange={setRentPaid}
          min={0}
          max={150000}
          step={500}
          prefix="₹"
          formatValue
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">City Type</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsMetro(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              isMetro ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Metro (Delhi, Mumbai, Kolkata, Chennai)
          </button>
          <button
            onClick={() => setIsMetro(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              !isMetro ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Non-Metro
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultStat label="HRA Exempt (Monthly)" value={formatINR(result.exemptAmount)} accent="positive" size="lg" />
        <ResultStat label="HRA Exempt (Annually)" value={formatINR(result.exemptAmount * 12)} accent="positive" />
        <ResultStat label="Taxable HRA (Monthly)" value={formatINR(result.taxableAmount)} />
        <ResultStat label="Taxable HRA (Annually)" value={formatINR(result.taxableAmount * 12)} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          HRA exemption is the lowest of these three conditions:
        </p>
        <div className="space-y-2">
          {conditions.map((c) => {
            const isLowest = Math.abs(c.value - result.exemptAmount) < 0.5;
            return (
              <div
                key={c.key}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-sm ${
                  isLowest ? "border-positive-500 bg-positive-50" : "border-slate-200"
                }`}
              >
                <span className="text-slate-700">{c.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold tabular-nums text-slate-900">{formatINR(c.value)}</span>
                  {isLowest && (
                    <span className="rounded-full bg-positive-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Lowest → Exempt
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DonutChart
        segments={[
          { label: "Exempt HRA (Annual)", value: result.exemptAmount * 12, color: "#16a34a" },
          { label: "Taxable HRA (Annual)", value: result.taxableAmount * 12, color: "#2563eb" },
        ]}
        centerValue={formatCompactINR(totalAnnualHRA)}
        centerLabel="Total HRA Received (Annual)"
      />
    </div>
  );
}

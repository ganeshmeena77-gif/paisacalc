"use client";

import { useMemo, useState } from "react";
import { calculateGST } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";

const GST_RATES = [0, 5, 12, 18, 28];

type Mode = "add" | "remove";

export default function GstCalculator() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<Mode>("add");

  const result = useMemo(() => calculateGST(amount, rate, mode), [amount, rate, mode]);

  const cgst = result.gstAmount / 2;
  const sgst = result.gstAmount / 2;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-1">
        <SliderInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          min={1}
          max={1000000}
          step={100}
          prefix="₹"
          formatValue
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">GST Rate</p>
          <div className="flex flex-wrap gap-2">
            {GST_RATES.map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  rate === r
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Mode</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode("add")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                mode === "add"
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Add GST
            </button>
            <button
              onClick={() => setMode("remove")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                mode === "remove"
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Remove GST
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Base Amount" value={formatINR(result.baseAmount)} />
        <ResultStat label="GST Amount" value={formatINR(result.gstAmount)} />
        <ResultStat label="Total Amount" value={formatINR(result.totalAmount)} accent="brand" size="lg" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultStat label="CGST (50%)" value={formatINR(cgst)} accent="positive" />
        <ResultStat label="SGST (50%)" value={formatINR(sgst)} accent="positive" />
      </div>

      <DonutChart
        segments={[
          { label: "Base Amount", value: result.baseAmount, color: "#2563eb" },
          { label: "GST Amount", value: result.gstAmount, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.totalAmount)}
        centerLabel="Total Amount"
      />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calculateEMI } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

type LoanType = "home" | "car" | "personal";

const LOAN_DEFAULTS: Record<LoanType, { label: string; amount: number; rate: number; tenure: number }> = {
  home: { label: "Home Loan", amount: 3000000, rate: 8.5, tenure: 20 },
  car: { label: "Car Loan", amount: 800000, rate: 9.5, tenure: 7 },
  personal: { label: "Personal Loan", amount: 500000, rate: 12, tenure: 5 },
};

export default function EmiCalculator() {
  const [loanType, setLoanType] = useState<LoanType>("home");
  const [amount, setAmount] = useState(LOAN_DEFAULTS.home.amount);
  const [rate, setRate] = useState(LOAN_DEFAULTS.home.rate);
  const [tenure, setTenure] = useState(LOAN_DEFAULTS.home.tenure);

  const handleLoanType = (type: LoanType) => {
    setLoanType(type);
    const defaults = LOAN_DEFAULTS[type];
    setAmount(defaults.amount);
    setRate(defaults.rate);
    setTenure(defaults.tenure);
  };

  const result = useMemo(() => calculateEMI(amount, rate, tenure * 12), [amount, rate, tenure]);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Loan Type</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(LOAN_DEFAULTS) as LoanType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleLoanType(type)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                loanType === type
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {LOAN_DEFAULTS[type].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <SliderInput
          label="Loan Amount"
          value={amount}
          onChange={setAmount}
          min={50000}
          max={20000000}
          step={10000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
          min={5}
          max={24}
          step={0.05}
          suffix="%"
        />
        <SliderInput
          label="Loan Tenure"
          value={tenure}
          onChange={setTenure}
          min={1}
          max={30}
          step={1}
          suffix=" yrs"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultStat label="Monthly EMI" value={formatINR(result.emi)} accent="brand" size="lg" />
        <ResultStat label="Principal Amount" value={formatINR(amount)} />
        <ResultStat label="Total Interest Payable" value={formatINR(result.totalInterest)} />
        <ResultStat label="Total Payment" value={formatINR(result.totalPayment)} />
      </div>

      <DonutChart
        segments={[
          { label: "Principal Amount", value: amount, color: "#2563eb" },
          { label: "Total Interest", value: result.totalInterest, color: "#16a34a" },
        ]}
        centerValue={formatCompactINR(result.totalPayment)}
        centerLabel="Total Payment"
      />

      <DataTable
        caption="Year-wise Amortization Schedule"
        columns={[
          { key: "year", label: "Year" },
          { key: "principalPaid", label: "Principal Paid", align: "right", format: (v) => formatINR(v as number) },
          { key: "interestPaid", label: "Interest Paid", align: "right", format: (v) => formatINR(v as number) },
          { key: "balance", label: "Outstanding Balance", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={result.schedule}
      />
    </div>
  );
}

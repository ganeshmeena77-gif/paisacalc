"use client";

import { useMemo, useState } from "react";
import { calculateTakeHomeSalary, type TaxRegime } from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DonutChart from "@/components/charts/DonutChart";
import DataTable from "@/components/DataTable";

const REGIMES: { value: TaxRegime; label: string }[] = [
  { value: "new", label: "New" },
  { value: "old", label: "Old" },
];

export default function InHandSalaryCalculator() {
  const [ctc, setCtc] = useState(1200000);
  const [basicPercent, setBasicPercent] = useState(50);
  const [professionalTax, setProfessionalTax] = useState(2400);
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [otherDeductions, setOtherDeductions] = useState(150000);

  const result = useMemo(
    () =>
      calculateTakeHomeSalary(
        ctc,
        basicPercent,
        professionalTax,
        regime,
        regime === "old" ? otherDeductions : 0
      ),
    [ctc, basicPercent, professionalTax, regime, otherDeductions]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <SliderInput
          label="Annual CTC"
          value={ctc}
          onChange={setCtc}
          min={200000}
          max={5000000}
          step={10000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Basic Salary (% of CTC)"
          value={basicPercent}
          onChange={setBasicPercent}
          min={30}
          max={60}
          step={5}
          suffix="%"
        />
        <SliderInput
          label="Professional Tax (Annual)"
          value={professionalTax}
          onChange={setProfessionalTax}
          min={0}
          max={2500}
          step={100}
          prefix="₹"
          formatValue
        />
        {regime === "old" && (
          <SliderInput
            label="Other Deductions (80C, 80D, HRA, etc.)"
            value={otherDeductions}
            onChange={setOtherDeductions}
            min={0}
            max={500000}
            step={5000}
            prefix="₹"
            formatValue
          />
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Tax Regime</p>
        <div className="flex flex-wrap gap-2">
          {REGIMES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRegime(r.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                regime === r.value
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultStat label="Monthly In-Hand Salary" value={formatINR(result.takeHomeMonthly)} accent="positive" size="lg" />
        <ResultStat label="Annual In-Hand Salary" value={formatINR(result.takeHomeAnnual)} accent="positive" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Basic Salary (Annual)" value={formatINR(result.basic)} />
        <ResultStat label="Employer PF Contribution" value={formatINR(result.employerPF)} />
        <ResultStat label="Gratuity Contribution" value={formatINR(result.gratuityContribution)} />
        <ResultStat label="Gross Salary" value={formatINR(result.grossSalary)} />
        <ResultStat label="Employee PF Contribution" value={formatINR(result.employeePF)} />
        <ResultStat label="Professional Tax" value={formatINR(result.professionalTax)} />
        <ResultStat label="Income Tax" value={formatINR(result.incomeTax)} />
      </div>

      <DonutChart
        segments={[
          { label: "In-Hand Salary", value: result.takeHomeAnnual, color: "#16a34a" },
          { label: "Employee PF", value: result.employeePF, color: "#2563eb" },
          { label: "Income Tax", value: result.incomeTax, color: "#dc2626" },
          { label: "Employer PF + Gratuity", value: result.employerPF + result.gratuityContribution, color: "#f59e0b" },
          { label: "Professional Tax", value: result.professionalTax, color: "#9333ea" },
        ]}
        centerValue={formatCompactINR(result.ctc)}
        centerLabel="Annual CTC"
      />

      <DataTable
        caption="Salary Breakdown"
        columns={[
          { key: "component", label: "Component" },
          { key: "amount", label: "Amount", align: "right", format: (v) => formatINR(v as number) },
        ]}
        rows={[
          { component: "Annual CTC", amount: result.ctc },
          { component: "Basic Salary", amount: result.basic },
          { component: "Employer PF", amount: result.employerPF },
          { component: "Gratuity Contribution", amount: result.gratuityContribution },
          { component: "Gross Salary", amount: result.grossSalary },
          { component: "Employee PF", amount: result.employeePF },
          { component: "Professional Tax", amount: result.professionalTax },
          { component: "Income Tax", amount: result.incomeTax },
          { component: "Annual In-Hand Salary", amount: result.takeHomeAnnual },
          { component: "Monthly In-Hand Salary", amount: result.takeHomeMonthly },
        ]}
      />
    </div>
  );
}

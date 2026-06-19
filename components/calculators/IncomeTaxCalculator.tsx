"use client";

import { useMemo, useState } from "react";
import {
  calculateIncomeTax,
  calculateIncomeTaxDetailed,
  type AgeGroup,
  type FiscalYear,
  type IncomeTaxDetailedResult,
  type IncomeTaxResult,
} from "@/lib/calculators";
import { formatINR, formatCompactINR } from "@/lib/format";
import SliderInput from "@/components/ui/SliderInput";
import ResultStat from "@/components/ui/ResultStat";
import DataTable from "@/components/DataTable";

const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: "below60", label: "Below 60" },
  { value: "60to80", label: "60 – 80 (Senior)" },
  { value: "above80", label: "Above 80 (Super Senior)" },
];

const FISCAL_YEARS: { value: FiscalYear; label: string; ayLabel: string }[] = [
  { value: "2026-27", label: "FY 2026-27", ayLabel: "AY 2027-28" },
  { value: "2025-26", label: "FY 2025-26", ayLabel: "AY 2026-27" },
];

export default function IncomeTaxCalculator() {
  const [fiscalYear, setFiscalYear] = useState<FiscalYear>("2026-27");
  const [salaryIncome, setSalaryIncome] = useState(1200000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [stcg111A, setStcg111A] = useState(0);
  const [ltcg112A, setLtcg112A] = useState(0);
  const [tdsPaid, setTdsPaid] = useState(0);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
  const [section80C, setSection80C] = useState(150000);
  const [section80D, setSection80D] = useState(0);
  const [section80CCD1B, setSection80CCD1B] = useState(0);
  const [hraExemption, setHraExemption] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const totalOldRegimeDeductionsClaimed =
    section80C + section80D + section80CCD1B + hraExemption + homeLoanInterest + otherDeductions;
  const grossIncome = salaryIncome + otherIncome + stcg111A + ltcg112A;
  const normalIncome = salaryIncome + otherIncome;

  const newRegime = useMemo(
    () => calculateIncomeTax(normalIncome, "new", ageGroup, 0, fiscalYear),
    [normalIncome, ageGroup, fiscalYear]
  );
  const oldRegime = useMemo(
    () => calculateIncomeTax(normalIncome, "old", ageGroup, totalOldRegimeDeductionsClaimed, fiscalYear),
    [normalIncome, ageGroup, totalOldRegimeDeductionsClaimed, fiscalYear]
  );

  const newRegimeDetailed = useMemo(
    () =>
      calculateIncomeTaxDetailed({
        salaryIncome,
        otherIncome,
        regime: "new",
        ageGroup,
        fiscalYear,
        oldRegimeDeductions: {
          section80C,
          section80D,
          section80CCD1B,
          hraExemption,
          homeLoanInterest,
          otherDeductions,
        },
        stcg111A,
        ltcg112A,
        tdsPaid,
      }),
    [
      salaryIncome,
      otherIncome,
      ageGroup,
      fiscalYear,
      section80C,
      section80D,
      section80CCD1B,
      hraExemption,
      homeLoanInterest,
      otherDeductions,
      stcg111A,
      ltcg112A,
      tdsPaid,
    ]
  );

  const oldRegimeDetailed = useMemo(
    () =>
      calculateIncomeTaxDetailed({
        salaryIncome,
        otherIncome,
        regime: "old",
        ageGroup,
        fiscalYear,
        oldRegimeDeductions: {
          section80C,
          section80D,
          section80CCD1B,
          hraExemption,
          homeLoanInterest,
          otherDeductions,
        },
        stcg111A,
        ltcg112A,
        tdsPaid,
      }),
    [
      salaryIncome,
      otherIncome,
      ageGroup,
      fiscalYear,
      section80C,
      section80D,
      section80CCD1B,
      hraExemption,
      homeLoanInterest,
      otherDeductions,
      stcg111A,
      ltcg112A,
      tdsPaid,
    ]
  );

  const better = newRegimeDetailed.totalTaxLiability <= oldRegimeDetailed.totalTaxLiability ? "new" : "old";
  const savings = Math.abs(newRegimeDetailed.totalTaxLiability - oldRegimeDetailed.totalTaxLiability);
  const selectedFY = FISCAL_YEARS.find((f) => f.value === fiscalYear)!;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
        <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Select Assessment Year</p>
        <div className="flex flex-wrap gap-3">
          {FISCAL_YEARS.map((fy) => (
            <button
              key={fy.value}
              onClick={() => setFiscalYear(fy.value)}
              className={`flex flex-col items-start rounded-xl border px-5 py-3 text-left transition ${
                fiscalYear === fy.value
                  ? "border-brand-500 bg-brand-600 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500"
              }`}
            >
              <span className="text-base font-bold">{fy.label}</span>
              <span className={`text-xs ${fiscalYear === fy.value ? "text-indigo-200" : "text-slate-400"}`}>
                {fy.ayLabel}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SliderInput
          label="Annual Salary Income"
          value={salaryIncome}
          onChange={setSalaryIncome}
          min={0}
          max={15000000}
          step={10000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="Other Income (FD interest, rent, freelance, etc.)"
          value={otherIncome}
          onChange={setOtherIncome}
          min={0}
          max={10000000}
          step={10000}
          prefix="₹"
          formatValue
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SliderInput
          label="STCG u/s 111A (equity, taxed at 15%)"
          value={stcg111A}
          onChange={setStcg111A}
          min={0}
          max={10000000}
          step={10000}
          prefix="₹"
          formatValue
        />
        <SliderInput
          label="LTCG u/s 112A (equity)"
          value={ltcg112A}
          onChange={setLtcg112A}
          min={0}
          max={10000000}
          step={10000}
          prefix="₹"
          formatValue
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SliderInput
          label="Total TDS / Advance Tax Already Paid"
          value={tdsPaid}
          onChange={setTdsPaid}
          min={0}
          max={5000000}
          step={5000}
          prefix="₹"
          formatValue
        />
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          <p className="font-semibold">Income Summary</p>
          <p className="mt-2">Gross Total Income: <span className="font-semibold">{formatINR(grossIncome)}</span></p>
          <p>Normal Income (salary + other): <span className="font-semibold">{formatINR(normalIncome)}</span></p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
        <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Old Regime Deductions (claimed values)
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderInput
            label="Section 80C (max ₹1.5L)"
            value={section80C}
            onChange={setSection80C}
            min={0}
            max={500000}
            step={5000}
            prefix="₹"
            formatValue
          />
          <SliderInput
            label="Section 80D (max ₹50,000)"
            value={section80D}
            onChange={setSection80D}
            min={0}
            max={150000}
            step={1000}
            prefix="₹"
            formatValue
          />
          <SliderInput
            label="Section 80CCD(1B) NPS (max ₹50,000)"
            value={section80CCD1B}
            onChange={setSection80CCD1B}
            min={0}
            max={100000}
            step={1000}
            prefix="₹"
            formatValue
          />
          <SliderInput
            label="HRA Exemption (manual input)"
            value={hraExemption}
            onChange={setHraExemption}
            min={0}
            max={3000000}
            step={5000}
            prefix="₹"
            formatValue
          />
          <SliderInput
            label="Home Loan Interest (self-occupied max ₹2L)"
            value={homeLoanInterest}
            onChange={setHomeLoanInterest}
            min={0}
            max={500000}
            step={5000}
            prefix="₹"
            formatValue
          />
          <SliderInput
            label="Other Eligible Deductions"
            value={otherDeductions}
            onChange={setOtherDeductions}
            min={0}
            max={500000}
            step={5000}
            prefix="₹"
            formatValue
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Age Group (affects Old Regime exemption limit)</p>
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((a) => (
            <button
              key={a.value}
              onClick={() => setAgeGroup(a.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                ageGroup === a.value
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <RegimeCard
          title={`New Regime (${selectedFY.label})`}
          result={newRegime}
          detailed={newRegimeDetailed}
          highlight={better === "new"}
        />
        <RegimeCard title="Old Regime" result={oldRegime} detailed={oldRegimeDetailed} highlight={better === "old"} />
      </div>

      <div className="rounded-xl bg-positive-50 p-4 text-center text-sm font-medium text-positive-600">
        The {better === "new" ? "New" : "Old"} Regime saves you {formatINR(savings)} per year compared
        to the other regime, based on the inputs above.
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SlabTable title={`New Regime — Slab-wise Tax (${selectedFY.label})`} result={newRegime} />
        <SlabTable title="Old Regime — Slab-wise Tax" result={oldRegime} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <CapitalGainsTable title="New Regime — Capital Gains & Settlement" detailed={newRegimeDetailed} />
        <CapitalGainsTable title="Old Regime — Capital Gains & Settlement" detailed={oldRegimeDetailed} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <DeductionSummaryTable title="Old Regime Deductions (claimed vs allowed)" detailed={oldRegimeDetailed} />
        <DeductionSummaryTable title="Reference (same claims, new regime ignores most)" detailed={newRegimeDetailed} />
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Note: This is an estimate for educational use. HRA exemption should be computed separately and then entered.
        Capital gains set-off rules, carry-forward losses, and relief under DTAA are not modeled.
      </p>
    </div>
  );
}

function RegimeCard({
  title,
  result,
  detailed,
  highlight,
}: {
  title: string;
  result: IncomeTaxResult;
  detailed: IncomeTaxDetailedResult;
  highlight: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-brand-300 bg-brand-50" : "border-slate-200"}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {highlight && (
          <span className="rounded-full bg-positive-500 px-2 py-0.5 text-xs font-semibold text-white">
            Lower Tax
          </span>
        )}
      </div>
      <div className="space-y-3">
        <ResultStat label="Taxable Income" value={formatINR(result.taxableIncome)} />
        <ResultStat
          label="Total Tax Liability (incl. cess)"
          value={formatINR(detailed.totalTaxLiability)}
          accent="brand"
          size="lg"
        />
        <ResultStat label="TDS / Advance Tax Paid" value={formatINR(detailed.tdsPaid)} />
        <ResultStat
          label={detailed.expectedRefund > 0 ? "Expected Refund" : "Net Tax Payable"}
          value={formatINR(detailed.expectedRefund > 0 ? detailed.expectedRefund : detailed.netTaxPayable)}
          accent={detailed.expectedRefund > 0 ? "positive" : "brand"}
        />
        <div className="grid grid-cols-2 gap-3">
          <ResultStat
            label="Post-Tax (Annual)"
            value={formatINR(detailed.grossTotalIncome - detailed.totalTaxLiability)}
            accent="positive"
          />
          <ResultStat
            label="Post-Tax (Monthly)"
            value={formatINR((detailed.grossTotalIncome - detailed.totalTaxLiability) / 12)}
            accent="positive"
          />
        </div>
      </div>
    </div>
  );
}

function SlabTable({ title, result }: { title: string; result: IncomeTaxResult }) {
  const rows = result.slabBreakdown.map((slab) => ({
    range:
      slab.upTo === Infinity
        ? `Above ${formatCompactINR(slab.from)}`
        : `${formatCompactINR(slab.from)} – ${formatCompactINR(slab.upTo)}`,
    rate: `${slab.rate}%`,
    tax: slab.taxAmount,
  }));

  if (rows.length === 0) {
    rows.push({ range: "—", rate: "0%", tax: 0 });
  }

  return (
    <DataTable
      caption={title}
      columns={[
        { key: "range", label: "Slab" },
        { key: "rate", label: "Rate" },
        { key: "tax", label: "Tax", align: "right", format: (v) => formatINR(v as number) },
      ]}
      rows={rows}
    />
  );
}

function CapitalGainsTable({ title, detailed }: { title: string; detailed: IncomeTaxDetailedResult }) {
  const rows = [
    { key: "STCG u/s 111A Tax (15%)", value: detailed.stcg111ATax },
    { key: "LTCG u/s 112A Exemption", value: detailed.ltcg112AExemption },
    { key: "LTCG u/s 112A Taxable", value: detailed.ltcg112ATaxable },
    { key: "LTCG u/s 112A Tax (12.5%)", value: detailed.ltcg112ATax },
    { key: "Surcharge", value: detailed.surcharge },
    { key: "Health & Education Cess (4%)", value: detailed.cess },
    { key: "Total Tax Liability", value: detailed.totalTaxLiability },
    { key: detailed.expectedRefund > 0 ? "Expected Refund" : "Net Tax Payable", value: detailed.expectedRefund > 0 ? detailed.expectedRefund : detailed.netTaxPayable },
  ];

  return (
    <DataTable
      caption={title}
      columns={[
        { key: "key", label: "Component" },
        { key: "value", label: "Amount", align: "right", format: (v) => formatINR(v as number) },
      ]}
      rows={rows}
    />
  );
}

function DeductionSummaryTable({ title, detailed }: { title: string; detailed: IncomeTaxDetailedResult }) {
  const d = detailed.deductionSummary;
  const rows = [
    { component: "Section 80C", claimed: d.section80CClaimed, allowed: d.section80CAllowed },
    { component: "Section 80D", claimed: d.section80DClaimed, allowed: d.section80DAllowed },
    { component: "Section 80CCD(1B)", claimed: d.section80CCD1BClaimed, allowed: d.section80CCD1BAllowed },
    { component: "HRA Exemption", claimed: d.hraExemptionClaimed, allowed: d.hraExemptionAllowed },
    { component: "Home Loan Interest", claimed: d.homeLoanInterestClaimed, allowed: d.homeLoanInterestAllowed },
    { component: "Other Deductions", claimed: d.otherDeductionsClaimed, allowed: d.otherDeductionsAllowed },
    { component: "Total", claimed: d.totalClaimed, allowed: d.totalAllowed },
  ];

  return (
    <DataTable
      caption={title}
      columns={[
        { key: "component", label: "Deduction" },
        { key: "claimed", label: "Claimed", align: "right", format: (v) => formatINR(v as number) },
        { key: "allowed", label: "Allowed", align: "right", format: (v) => formatINR(v as number) },
      ]}
      rows={rows}
    />
  );
}

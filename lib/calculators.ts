/**
 * Pure calculation functions backing every calculator on the site.
 * No React, no formatting — inputs and outputs are plain numbers so the
 * formulas can be unit tested and reused across server/client components.
 */

export interface YearPoint {
  year: number;
  invested: number;
  totalValue: number;
  returns: number;
}

export interface GrowthResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  yearWise: YearPoint[];
}

/* ------------------------------------------------------------------ */
/* SIP                                                                  */
/* ------------------------------------------------------------------ */

/**
 * Future value of a monthly SIP using the standard annuity-due formula:
 * M x ({[1+i]^n - 1} / i) x (1+i), where i is the monthly rate.
 */
export function calculateSIP(
  monthlyInvestment: number,
  annualReturnPercent: number,
  years: number
): GrowthResult {
  const i = annualReturnPercent / 12 / 100;
  const yearWise: YearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    const n = y * 12;
    const invested = monthlyInvestment * n;
    const totalValue =
      i === 0
        ? invested
        : monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    yearWise.push({ year: y, invested, totalValue, returns: totalValue - invested });
  }

  const last = yearWise[yearWise.length - 1] ?? { invested: 0, totalValue: 0, returns: 0 };
  return {
    investedAmount: last.invested,
    estimatedReturns: last.returns,
    totalValue: last.totalValue,
    yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* Step-up SIP                                                          */
/* ------------------------------------------------------------------ */

/**
 * SIP where the monthly contribution increases by a fixed % every year.
 * Uses the same per-month recurrence FV = (FV + M) x (1+i) as the plain
 * SIP formula so a 0% step-up matches calculateSIP exactly.
 */
export function calculateStepUpSIP(
  initialMonthlyInvestment: number,
  annualReturnPercent: number,
  years: number,
  annualStepUpPercent: number
): GrowthResult {
  const i = annualReturnPercent / 12 / 100;
  let totalValue = 0;
  let invested = 0;
  let currentMonthly = initialMonthlyInvestment;
  const yearWise: YearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      totalValue = (totalValue + currentMonthly) * (1 + i);
      invested += currentMonthly;
    }
    yearWise.push({ year: y, invested, totalValue, returns: totalValue - invested });
    currentMonthly *= 1 + annualStepUpPercent / 100;
  }

  const last = yearWise[yearWise.length - 1] ?? { invested: 0, totalValue: 0, returns: 0 };
  return {
    investedAmount: last.invested,
    estimatedReturns: last.returns,
    totalValue: last.totalValue,
    yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* Lumpsum                                                              */
/* ------------------------------------------------------------------ */

/** Future value of a one-time investment compounded annually: P(1+r)^n. */
export function calculateLumpsum(
  principal: number,
  annualReturnPercent: number,
  years: number
): GrowthResult {
  const r = annualReturnPercent / 100;
  const yearWise: YearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    const totalValue = principal * Math.pow(1 + r, y);
    yearWise.push({ year: y, invested: principal, totalValue, returns: totalValue - principal });
  }

  const last = yearWise[yearWise.length - 1] ?? { invested: principal, totalValue: principal, returns: 0 };
  return {
    investedAmount: principal,
    estimatedReturns: last.returns,
    totalValue: last.totalValue,
    yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* SWP                                                                  */
/* ------------------------------------------------------------------ */

export interface SWPYearPoint {
  year: number;
  withdrawn: number;
  balance: number;
}

export interface SWPResult {
  totalInvestment: number;
  totalWithdrawn: number;
  finalValue: number;
  yearWise: SWPYearPoint[];
}

/**
 * Systematic Withdrawal Plan: corpus grows monthly, a fixed amount is
 * withdrawn at the end of each month until the corpus is exhausted.
 */
export function calculateSWP(
  initialInvestment: number,
  monthlyWithdrawal: number,
  annualReturnPercent: number,
  years: number
): SWPResult {
  const i = annualReturnPercent / 12 / 100;
  let balance = initialInvestment;
  let totalWithdrawn = 0;
  const yearWise: SWPYearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      if (balance <= 0) {
        balance = 0;
        totalWithdrawn += 0;
        continue;
      }
      balance = balance * (1 + i) - monthlyWithdrawal;
      totalWithdrawn += monthlyWithdrawal;
      if (balance < 0) balance = 0;
    }
    yearWise.push({ year: y, withdrawn: totalWithdrawn, balance });
  }

  return {
    totalInvestment: initialInvestment,
    totalWithdrawn,
    finalValue: balance,
    yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* EMI                                                                  */
/* ------------------------------------------------------------------ */

export interface EMIYearPoint {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: EMIYearPoint[];
}

/** Standard reducing-balance EMI formula: P x r x (1+r)^n / ((1+r)^n - 1). */
export function calculateEMI(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
): EMIResult {
  const r = annualRatePercent / 12 / 100;
  const emi =
    r === 0
      ? principal / tenureMonths
      : (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);

  let balance = principal;
  let yearPrincipal = 0;
  let yearInterest = 0;
  const schedule: EMIYearPoint[] = [];

  for (let m = 1; m <= tenureMonths; m++) {
    const interestForMonth = balance * r;
    let principalForMonth = emi - interestForMonth;
    if (m === tenureMonths) principalForMonth = balance; // mop up rounding
    balance -= principalForMonth;
    yearPrincipal += principalForMonth;
    yearInterest += interestForMonth;

    if (m % 12 === 0 || m === tenureMonths) {
      schedule.push({
        year: Math.ceil(m / 12),
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        balance: Math.max(balance, 0),
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  const totalPayment = emi * tenureMonths;
  return { emi, totalInterest: totalPayment - principal, totalPayment, schedule };
}

/* ------------------------------------------------------------------ */
/* GST                                                                  */
/* ------------------------------------------------------------------ */

export interface GSTResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  rate: number;
}

export function calculateGST(
  amount: number,
  ratePercent: number,
  mode: "add" | "remove"
): GSTResult {
  if (mode === "add") {
    const gstAmount = amount * (ratePercent / 100);
    return { baseAmount: amount, gstAmount, totalAmount: amount + gstAmount, rate: ratePercent };
  }
  const baseAmount = amount / (1 + ratePercent / 100);
  return { baseAmount, gstAmount: amount - baseAmount, totalAmount: amount, rate: ratePercent };
}

/* ------------------------------------------------------------------ */
/* FD                                                                   */
/* ------------------------------------------------------------------ */

/**
 * Compound interest on a fixed deposit: P(1 + r/n)^(n*t).
 * compoundingPerYear: 1 = annually, 2 = half-yearly, 4 = quarterly (typical
 * for Indian bank FDs), 12 = monthly.
 */
export function calculateFD(
  principal: number,
  annualRatePercent: number,
  years: number,
  compoundingPerYear: 1 | 2 | 4 | 12 = 4
): GrowthResult {
  const r = annualRatePercent / 100;
  const yearWise: YearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    const totalValue = principal * Math.pow(1 + r / compoundingPerYear, compoundingPerYear * y);
    yearWise.push({ year: y, invested: principal, totalValue, returns: totalValue - principal });
  }

  const last = yearWise[yearWise.length - 1] ?? { invested: principal, totalValue: principal, returns: 0 };
  return {
    investedAmount: principal,
    estimatedReturns: last.returns,
    totalValue: last.totalValue,
    yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* RD                                                                   */
/* ------------------------------------------------------------------ */

/**
 * Recurring deposit maturity using the formula banks use for quarterly
 * compounding on monthly instalments:
 * M = R x [(1+i)^n - 1] / (1 - (1+i)^(-1/3)), i = annual rate / 400 (quarterly),
 * n = number of quarters.
 */
export function calculateRD(
  monthlyDeposit: number,
  annualRatePercent: number,
  years: number
): GrowthResult {
  const i = annualRatePercent / 400;
  const yearWise: YearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    const n = months / 3; // always a whole number of quarters
    const invested = monthlyDeposit * months;
    const totalValue =
      i === 0
        ? invested
        : monthlyDeposit * ((Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1 / 3)));
    yearWise.push({ year: y, invested, totalValue, returns: totalValue - invested });
  }

  const last = yearWise[yearWise.length - 1] ?? { invested: 0, totalValue: 0, returns: 0 };
  return {
    investedAmount: last.invested,
    estimatedReturns: last.returns,
    totalValue: last.totalValue,
    yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* PPF                                                                  */
/* ------------------------------------------------------------------ */

/**
 * PPF maturity assuming the full yearly contribution is made at the start
 * of the financial year (the best-case, most commonly quoted scenario).
 * Current rate: 7.1% p.a. (Apr-Jun 2026 quarter), compounded annually.
 */
export function calculatePPF(
  yearlyInvestment: number,
  years: number,
  ratePercent = 7.1
): GrowthResult {
  const r = ratePercent / 100;
  let balance = 0;
  let invested = 0;
  const yearWise: YearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    balance = (balance + yearlyInvestment) * (1 + r);
    invested += yearlyInvestment;
    yearWise.push({ year: y, invested, totalValue: balance, returns: balance - invested });
  }

  const last = yearWise[yearWise.length - 1] ?? { invested: 0, totalValue: 0, returns: 0 };
  return {
    investedAmount: last.invested,
    estimatedReturns: last.returns,
    totalValue: last.totalValue,
    yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* HRA exemption                                                        */
/* ------------------------------------------------------------------ */

export interface HRAResult {
  exemptAmount: number;
  taxableAmount: number;
  actualHRA: number;
  rentMinusTenPercent: number;
  metroLimit: number;
}

/**
 * HRA exemption under Section 10(13A) = minimum of:
 * 1) Actual HRA received
 * 2) Rent paid - 10% of (Basic + DA)
 * 3) 50% of (Basic + DA) for metro cities, 40% for non-metro
 */
export function calculateHRAExemption(
  basicPlusDA: number,
  hraReceived: number,
  rentPaid: number,
  isMetro: boolean
): HRAResult {
  const rentMinusTenPercent = Math.max(0, rentPaid - 0.1 * basicPlusDA);
  const metroLimit = (isMetro ? 0.5 : 0.4) * basicPlusDA;
  const exemptAmount = Math.max(0, Math.min(hraReceived, rentMinusTenPercent, metroLimit));

  return {
    exemptAmount,
    taxableAmount: hraReceived - exemptAmount,
    actualHRA: hraReceived,
    rentMinusTenPercent,
    metroLimit,
  };
}

/* ------------------------------------------------------------------ */
/* Gratuity                                                             */
/* ------------------------------------------------------------------ */

export interface GratuityResult {
  gratuityAmount: number;
  taxExemptAmount: number;
  taxableAmount: number;
  yearsConsidered: number;
}

const GRATUITY_EXEMPTION_LIMIT = 2000000; // Sec 10(10), unchanged since 2019

/**
 * Gratuity = (Basic + DA) x 15/26 x years of service for employees covered
 * under the Payment of Gratuity Act, 1972 (15/30 if not covered).
 * For covered employees, a final-year remainder of 6 months or more rounds
 * up to a full year.
 */
export function calculateGratuity(
  basicPlusDA: number,
  yearsOfService: number,
  coveredUnderAct: boolean
): GratuityResult {
  let years = yearsOfService;
  if (coveredUnderAct) {
    const wholeYears = Math.floor(yearsOfService);
    const remainder = yearsOfService - wholeYears;
    years = remainder >= 0.5 ? wholeYears + 1 : wholeYears;
  }

  const divisor = coveredUnderAct ? 26 : 30;
  const gratuityAmount = (basicPlusDA * 15 * years) / divisor;
  const taxExemptAmount = Math.min(gratuityAmount, GRATUITY_EXEMPTION_LIMIT);

  return {
    gratuityAmount,
    taxExemptAmount,
    taxableAmount: Math.max(0, gratuityAmount - taxExemptAmount),
    yearsConsidered: years,
  };
}

/* ------------------------------------------------------------------ */
/* NPS                                                                  */
/* ------------------------------------------------------------------ */

export interface NPSResult {
  totalInvestment: number;
  totalCorpus: number;
  lumpsumAmount: number;
  annuityCorpus: number;
  monthlyPension: number;
  yearWise: YearPoint[];
}

/**
 * NPS accumulation uses the same formula as a SIP. At retirement the corpus
 * is split between a tax-free lumpsum and an annuity, which is converted to
 * a monthly pension at the assumed annuity rate.
 */
export function calculateNPS(
  monthlyContribution: number,
  currentAge: number,
  retirementAge: number,
  expectedReturnPercent: number,
  annuityPercent: number,
  annuityRatePercent: number
): NPSResult {
  const years = Math.max(0, retirementAge - currentAge);
  const growth = calculateSIP(monthlyContribution, expectedReturnPercent, years);

  const annuityCorpus = growth.totalValue * (annuityPercent / 100);
  const lumpsumAmount = growth.totalValue - annuityCorpus;
  const monthlyPension = (annuityCorpus * (annuityRatePercent / 100)) / 12;

  return {
    totalInvestment: growth.investedAmount,
    totalCorpus: growth.totalValue,
    lumpsumAmount,
    annuityCorpus,
    monthlyPension,
    yearWise: growth.yearWise,
  };
}

/* ------------------------------------------------------------------ */
/* Inflation                                                            */
/* ------------------------------------------------------------------ */

export interface InflationYearPoint {
  year: number;
  futureCost: number;
}

export interface InflationResult {
  futureCost: number;
  lossOfValue: number;
  yearWise: InflationYearPoint[];
}

/** Future cost of today's expense, and how much value money loses over time. */
export function calculateInflation(
  currentAmount: number,
  inflationRatePercent: number,
  years: number
): InflationResult {
  const r = inflationRatePercent / 100;
  const yearWise: InflationYearPoint[] = [];

  for (let y = 1; y <= years; y++) {
    yearWise.push({ year: y, futureCost: currentAmount * Math.pow(1 + r, y) });
  }

  const futureCost = yearWise[yearWise.length - 1]?.futureCost ?? currentAmount;
  return { futureCost, lossOfValue: futureCost - currentAmount, yearWise };
}

/* ------------------------------------------------------------------ */
/* Income tax (FY 2026-27 / AY 2027-28)                                 */
/* ------------------------------------------------------------------ */

export type TaxRegime = "new" | "old";
export type AgeGroup = "below60" | "60to80" | "above80";

export interface TaxSlab {
  from: number;
  upTo: number;
  rate: number;
}

export interface TaxSlabBreakdown extends TaxSlab {
  taxAmount: number;
}

export interface IncomeTaxResult {
  grossIncome: number;
  standardDeduction: number;
  otherDeductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  takeHomeAnnual: number;
  effectiveRate: number;
  slabBreakdown: TaxSlabBreakdown[];
}

/** New regime slabs, unchanged for FY 2026-27 (Budget 2026 retained FY 2025-26 structure). */
export const NEW_REGIME_SLABS: TaxSlab[] = [
  { from: 0, upTo: 400000, rate: 0 },
  { from: 400000, upTo: 800000, rate: 5 },
  { from: 800000, upTo: 1200000, rate: 10 },
  { from: 1200000, upTo: 1600000, rate: 15 },
  { from: 1600000, upTo: 2000000, rate: 20 },
  { from: 2000000, upTo: 2400000, rate: 25 },
  { from: 2400000, upTo: Infinity, rate: 30 },
];

/** Old regime slabs vary by age; the basic exemption limit shifts up. */
export function getOldRegimeSlabs(ageGroup: AgeGroup): TaxSlab[] {
  const exemptionLimit = ageGroup === "below60" ? 250000 : ageGroup === "60to80" ? 300000 : 500000;
  const raw: TaxSlab[] = [
    { from: 0, upTo: exemptionLimit, rate: 0 },
    { from: exemptionLimit, upTo: 500000, rate: 5 },
    { from: 500000, upTo: 1000000, rate: 20 },
    { from: 1000000, upTo: Infinity, rate: 30 },
  ];
  return raw.filter((slab) => slab.upTo > slab.from);
}

function computeSlabTax(taxableIncome: number, slabs: TaxSlab[]): { tax: number; breakdown: TaxSlabBreakdown[] } {
  let tax = 0;
  const breakdown: TaxSlabBreakdown[] = [];

  for (const slab of slabs) {
    if (taxableIncome <= slab.from) continue;
    const taxableInSlab = Math.min(taxableIncome, slab.upTo) - slab.from;
    const taxAmount = (taxableInSlab * slab.rate) / 100;
    tax += taxAmount;
    breakdown.push({ ...slab, taxAmount });
  }

  return { tax, breakdown };
}

function computeSurcharge(tax: number, taxableIncome: number, regime: TaxRegime): number {
  let rate = 0;
  if (taxableIncome > 50000000) rate = regime === "new" ? 25 : 37;
  else if (taxableIncome > 20000000) rate = 25;
  else if (taxableIncome > 10000000) rate = 15;
  else if (taxableIncome > 5000000) rate = 10;
  return (tax * rate) / 100;
}

/**
 * Computes total tax payable for FY 2026-27 (AY 2027-28).
 *
 * - New regime: flat ₹75,000 standard deduction, no other deductions allowed.
 * - Old regime: ₹50,000 standard deduction plus any other deductions the
 *   user enters (80C, 80D, home loan interest, HRA exemption, etc.).
 *
 * Section 87A rebate + marginal relief is applied so tax never increases by
 * more than the income that crosses the rebate threshold (₹12L new / ₹5L old).
 * A basic surcharge is applied above ₹50L (without its own marginal relief —
 * very high earners should consult a CA for that nuance).
 */
export function calculateIncomeTax(
  grossIncome: number,
  regime: TaxRegime,
  ageGroup: AgeGroup = "below60",
  otherDeductions = 0
): IncomeTaxResult {
  const standardDeduction = regime === "new" ? 75000 : 50000;
  const deductions = regime === "new" ? 0 : Math.max(0, otherDeductions);
  const taxableIncome = Math.max(0, grossIncome - standardDeduction - deductions);

  const slabs = regime === "new" ? NEW_REGIME_SLABS : getOldRegimeSlabs(ageGroup);
  const { tax: taxBeforeRebate, breakdown } = computeSlabTax(taxableIncome, slabs);

  const rebateThreshold = regime === "new" ? 1200000 : 500000;
  const maxRebate = regime === "new" ? 60000 : 12500;

  let taxAfterRebate: number;
  let rebate: number;

  if (taxableIncome <= rebateThreshold) {
    rebate = Math.min(taxBeforeRebate, maxRebate);
    taxAfterRebate = taxBeforeRebate - rebate;
  } else {
    const excess = taxableIncome - rebateThreshold;
    if (taxBeforeRebate > excess) {
      taxAfterRebate = excess;
      rebate = taxBeforeRebate - taxAfterRebate;
    } else {
      taxAfterRebate = taxBeforeRebate;
      rebate = 0;
    }
  }

  const surcharge = computeSurcharge(taxAfterRebate, taxableIncome, regime);
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = taxAfterRebate + surcharge + cess;

  return {
    grossIncome,
    standardDeduction,
    otherDeductions: deductions,
    taxableIncome,
    taxBeforeRebate,
    rebate,
    surcharge,
    cess,
    totalTax,
    takeHomeAnnual: grossIncome - totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    slabBreakdown: breakdown,
  };
}

/* ------------------------------------------------------------------ */
/* In-hand / take-home salary                                           */
/* ------------------------------------------------------------------ */

export interface TakeHomeResult {
  ctc: number;
  basic: number;
  employerPF: number;
  gratuityContribution: number;
  grossSalary: number;
  employeePF: number;
  professionalTax: number;
  incomeTax: number;
  takeHomeAnnual: number;
  takeHomeMonthly: number;
  taxDetails: IncomeTaxResult;
}

const EMPLOYEE_PF_RATE = 0.12;
const EMPLOYER_PF_RATE = 0.12;
const GRATUITY_RATE = 0.0481;

/**
 * Approximates take-home pay from CTC. Employer PF and the gratuity
 * contribution are part of CTC but never reach the employee, so they're
 * removed first to get the gross salary. Employee PF (Sec 80C, old regime
 * only) and professional tax are then deducted, along with income tax.
 */
export function calculateTakeHomeSalary(
  ctc: number,
  basicPercentOfCTC: number,
  professionalTaxAnnual: number,
  regime: TaxRegime,
  otherDeductions = 0
): TakeHomeResult {
  const basic = ctc * (basicPercentOfCTC / 100);
  const employerPF = basic * EMPLOYER_PF_RATE;
  const gratuityContribution = basic * GRATUITY_RATE;
  const grossSalary = Math.max(0, ctc - employerPF - gratuityContribution);

  const employeePF = basic * EMPLOYEE_PF_RATE;
  const additionalDeductions = regime === "old" ? employeePF + otherDeductions : otherDeductions;

  const taxDetails = calculateIncomeTax(grossSalary, regime, "below60", additionalDeductions);

  const takeHomeAnnual = grossSalary - employeePF - professionalTaxAnnual - taxDetails.totalTax;

  return {
    ctc,
    basic,
    employerPF,
    gratuityContribution,
    grossSalary,
    employeePF,
    professionalTax: professionalTaxAnnual,
    incomeTax: taxDetails.totalTax,
    takeHomeAnnual,
    takeHomeMonthly: takeHomeAnnual / 12,
    taxDetails,
  };
}

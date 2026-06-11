import {
  Landmark,
  TrendingUp,
  Home,
  Percent,
  PiggyBank,
  Vault,
  Building2,
  Award,
  Wallet,
  ShieldCheck,
  Banknote,
  ArrowDownToLine,
  CalendarClock,
  Rocket,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export type CalculatorCategory =
  | "Tax & Salary"
  | "Investments"
  | "Savings & Retirement"
  | "Loans";

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: CalculatorCategory;
  icon: LucideIcon;
  /** Slugs of 3 related calculators shown at the bottom of the page. */
  related: string[];
}

export const calculators: CalculatorMeta[] = [
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator (FY 2026-27) – New vs Old Regime",
    shortTitle: "Income Tax Calculator",
    description:
      "Calculate your income tax for FY 2026-27 (AY 2027-28) under the new and old tax regimes. Compare slabs, deductions, and take-home pay instantly.",
    category: "Tax & Salary",
    icon: Landmark,
    related: ["hra-calculator", "in-hand-salary-calculator", "gratuity-calculator"],
  },
  {
    slug: "sip-calculator",
    title: "SIP Calculator – Calculate Mutual Fund SIP Returns Online",
    shortTitle: "SIP Calculator",
    description:
      "Estimate the future value of your monthly SIP investments with our free SIP calculator. See invested amount, returns, and year-wise growth.",
    category: "Investments",
    icon: TrendingUp,
    related: ["lumpsum-calculator", "step-up-sip-calculator", "swp-calculator"],
  },
  {
    slug: "emi-calculator",
    title: "EMI Calculator – Home, Car & Personal Loan EMI Online",
    shortTitle: "EMI Calculator",
    description:
      "Calculate your monthly EMI for home, car, or personal loans. View total interest payable and a year-wise amortization schedule.",
    category: "Loans",
    icon: Home,
    related: ["sip-calculator", "fd-calculator", "inflation-calculator"],
  },
  {
    slug: "gst-calculator",
    title: "GST Calculator – Add or Remove GST Online (All Slabs)",
    shortTitle: "GST Calculator",
    description:
      "Quickly add or remove GST at 5%, 12%, 18%, or 28% from any amount. Get the base price, GST amount, and total in seconds.",
    category: "Tax & Salary",
    icon: Percent,
    related: ["income-tax-calculator", "in-hand-salary-calculator", "inflation-calculator"],
  },
  {
    slug: "fd-calculator",
    title: "FD Calculator – Fixed Deposit Maturity & Interest Calculator",
    shortTitle: "FD Calculator",
    description:
      "Calculate the maturity value and interest earned on your bank fixed deposit with quarterly compounding.",
    category: "Savings & Retirement",
    icon: PiggyBank,
    related: ["rd-calculator", "ppf-calculator", "sip-calculator"],
  },
  {
    slug: "ppf-calculator",
    title: "PPF Calculator – Public Provident Fund Maturity Calculator",
    shortTitle: "PPF Calculator",
    description:
      "Calculate your PPF maturity amount at the current 7.1% interest rate over 15 years or more, with a year-wise growth table.",
    category: "Savings & Retirement",
    icon: Vault,
    related: ["fd-calculator", "nps-calculator", "sip-calculator"],
  },
  {
    slug: "hra-calculator",
    title: "HRA Calculator – Calculate House Rent Allowance Exemption",
    shortTitle: "HRA Calculator",
    description:
      "Calculate your tax-exempt HRA under Section 10(13A) based on basic salary, rent paid, and city of residence.",
    category: "Tax & Salary",
    icon: Building2,
    related: ["income-tax-calculator", "in-hand-salary-calculator", "gratuity-calculator"],
  },
  {
    slug: "gratuity-calculator",
    title: "Gratuity Calculator – Calculate Gratuity Amount Online (India)",
    shortTitle: "Gratuity Calculator",
    description:
      "Calculate your gratuity amount using the 15/26 formula and check how much is tax-exempt under Section 10(10).",
    category: "Tax & Salary",
    icon: Award,
    related: ["income-tax-calculator", "in-hand-salary-calculator", "hra-calculator"],
  },
  {
    slug: "lumpsum-calculator",
    title: "Lumpsum Calculator – Mutual Fund Lumpsum Investment Returns",
    shortTitle: "Lumpsum Calculator",
    description:
      "Calculate the future value of a one-time mutual fund investment with our free lumpsum calculator and year-wise growth table.",
    category: "Investments",
    icon: Wallet,
    related: ["sip-calculator", "step-up-sip-calculator", "swp-calculator"],
  },
  {
    slug: "nps-calculator",
    title: "NPS Calculator – National Pension System Returns & Pension",
    shortTitle: "NPS Calculator",
    description:
      "Estimate your NPS retirement corpus, lumpsum withdrawal, and monthly pension based on your contributions and expected returns.",
    category: "Savings & Retirement",
    icon: ShieldCheck,
    related: ["ppf-calculator", "sip-calculator", "income-tax-calculator"],
  },
  {
    slug: "in-hand-salary-calculator",
    title: "In Hand Salary Calculator – CTC to Take Home Salary",
    shortTitle: "In-Hand Salary Calculator",
    description:
      "Convert your CTC to monthly in-hand salary after PF, professional tax, and income tax deductions for FY 2026-27.",
    category: "Tax & Salary",
    icon: Banknote,
    related: ["income-tax-calculator", "hra-calculator", "gratuity-calculator"],
  },
  {
    slug: "swp-calculator",
    title: "SWP Calculator – Systematic Withdrawal Plan Calculator",
    shortTitle: "SWP Calculator",
    description:
      "Calculate how long your investment will last with a Systematic Withdrawal Plan, including year-wise balance and total withdrawals.",
    category: "Investments",
    icon: ArrowDownToLine,
    related: ["sip-calculator", "lumpsum-calculator", "fd-calculator"],
  },
  {
    slug: "rd-calculator",
    title: "RD Calculator – Recurring Deposit Maturity Calculator",
    shortTitle: "RD Calculator",
    description:
      "Calculate the maturity value of your recurring deposit (RD) with quarterly compounding and a year-wise growth table.",
    category: "Savings & Retirement",
    icon: CalendarClock,
    related: ["fd-calculator", "ppf-calculator", "sip-calculator"],
  },
  {
    slug: "step-up-sip-calculator",
    title: "Step-Up SIP Calculator – Calculate Returns with Annual Increase",
    shortTitle: "Step-Up SIP Calculator",
    description:
      "Calculate SIP returns when you increase your monthly investment every year. See how step-up SIP boosts your final corpus.",
    category: "Investments",
    icon: Rocket,
    related: ["sip-calculator", "lumpsum-calculator", "swp-calculator"],
  },
  {
    slug: "inflation-calculator",
    title: "Inflation Calculator India – Future Value of Money",
    shortTitle: "Inflation Calculator",
    description:
      "See how inflation affects the value of your money over time and what today's expenses will cost in the future.",
    category: "Investments",
    icon: LineChart,
    related: ["sip-calculator", "lumpsum-calculator", "swp-calculator"],
  },
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}

export const SITE_NAME = "PaisaCalc";
export const SITE_URL = "https://paisacalc.com";
export const SITE_TAGLINE = "Free Indian Finance & Tax Calculators";

import CalculatorGrid from "@/components/CalculatorGrid";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          15 Free Calculators for Indian Taxes &amp; Investments
        </h1>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          Income tax, SIP, EMI, GST, PPF, gratuity and more &mdash; updated for FY 2026-27. No login,
          no signup, just instant results.
        </p>
      </div>
      <CalculatorGrid />
    </div>
  );
}

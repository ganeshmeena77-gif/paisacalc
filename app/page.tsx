import CalculatorGrid from "@/components/CalculatorGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-20 sm:py-28">
        {/* Background gradient orb */}
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 opacity-10 blur-3xl"></div>
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tr from-pink-300 to-purple-400 opacity-10 blur-3xl"></div>

        <div className="relative mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2">
            <span className="text-sm font-semibold text-blue-600">✨ 15 Free Calculators</span>
          </div>
          <h1 className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Indian Financial Calculators
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            Income tax, SIP, EMI, GST, PPF, gratuity and more — updated for FY 2026-27. No login, no signup, just instant results.
          </p>
        </div>
      </div>

      {/* Calculators Grid Section */}
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CalculatorGrid />
      </div>
    </div>
  );
}

interface ResultStatProps {
  label: string;
  value: string;
  accent?: "brand" | "positive" | "neutral";
  size?: "lg" | "md";
}

const colorClasses: Record<NonNullable<ResultStatProps["accent"]>, string> = {
  brand: "text-brand-700",
  positive: "text-positive-600",
  neutral: "text-slate-900",
};

export default function ResultStat({ label, value, accent = "neutral", size = "md" }: ResultStatProps) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`font-bold tabular-nums ${colorClasses[accent]} ${
          size === "lg" ? "text-2xl sm:text-4xl" : "text-lg sm:text-2xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel?: string;
  centerValue?: string;
}

const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Lightweight, dependency-free SVG donut chart for 2-3 value breakdowns. */
export default function DonutChart({ segments, centerLabel, centerValue }: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  let cumulative = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 160 160" className="h-44 w-44 -rotate-90">
          <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="20" />
          {total > 0 &&
            segments.map((segment, idx) => {
              const fraction = Math.max(0, segment.value) / total;
              const dash = fraction * CIRCUMFERENCE;
              const offset = cumulative * CIRCUMFERENCE;
              cumulative += fraction;
              if (dash <= 0) return null;
              return (
                <circle
                  key={idx}
                  cx="80"
                  cy="80"
                  r={RADIUS}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="20"
                  strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                  strokeDashoffset={-offset}
                />
              );
            })}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {centerValue && <p className="text-base font-bold text-slate-900">{centerValue}</p>}
            {centerLabel && <p className="text-xs text-slate-500">{centerLabel}</p>}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {segments.map((segment, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: segment.color }} />
            <span className="text-slate-600">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

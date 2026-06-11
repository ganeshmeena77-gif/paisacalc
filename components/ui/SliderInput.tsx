"use client";

import { formatNumber } from "@/lib/format";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  /** Show comma-grouped Indian formatting in the text input (for currency amounts). */
  formatValue?: boolean;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  formatValue = false,
}: SliderInputProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    if (raw === "") {
      onChange(0);
      return;
    }
    onChange(Number(raw));
  };

  const handleBlur = () => {
    if (value < min) onChange(min);
    if (value > max) onChange(max);
  };

  const displayValue = formatValue ? formatNumber(value) : String(value);

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5">
          {prefix && <span className="text-sm text-slate-500">{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleTextChange}
            onBlur={handleBlur}
            className="w-24 bg-transparent text-right text-sm font-semibold text-slate-900 outline-none"
            aria-label={label}
          />
          {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>
          {prefix}
          {formatValue ? formatNumber(min) : min}
          {suffix}
        </span>
        <span>
          {prefix}
          {formatValue ? formatNumber(max) : max}
          {suffix}
        </span>
      </div>
    </div>
  );
}

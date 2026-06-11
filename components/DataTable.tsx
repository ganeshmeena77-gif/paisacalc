export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  format?: (value: T[keyof T]) => string;
  align?: "left" | "right";
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  caption?: string;
}

/** Generic responsive table used for year-wise growth / amortization breakdowns. */
export default function DataTable<T extends object>({
  columns,
  rows,
  caption,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      {caption && (
        <p className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
          {caption}
        </p>
      )}
      <div className="max-h-96 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-2 font-semibold ${col.align === "right" ? "text-right" : "text-left"}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                {columns.map((col) => {
                  const value = row[col.key];
                  return (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-2 text-slate-700 ${col.align === "right" ? "text-right tabular-nums" : ""}`}
                    >
                      {col.format ? col.format(value) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

interface ImportCsvProps {
  /** Table to insert rows into. */
  table: string;
  /** Expected column keys (from CSV header). */
  columns: string[];
  /** Called after a successful import to refresh data. */
  onImported?: () => void;
  /** Label for the import button. */
  label?: string;
}

interface ImportResult {
  imported: number;
  skipped: number;
  errors: string[];
}

export function ImportCsv({ table, columns, onImported, label = "Importar CSV" }: ImportCsvProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [importing, setImporting] = useState(false);

  const parseCsv = (text: string): Record<string, string>[] => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    const headers = lines[0].split(";").map((h) => h.trim().replace(/^"|"$/g, ""));
    return lines.slice(1).map((line) => {
      const values = line.split(";").map((v) => v.trim().replace(/^"|"$/g, ""));
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] ?? "";
      });
      return row;
    });
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setResult(null);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      let imported = 0;
      let skipped = 0;
      const errors: string[] = [];

      for (const row of rows) {
        const payload: Record<string, unknown> = {};
        let hasRequired = false;

        for (const col of columns) {
          const raw = row[col];
          if (raw !== undefined && raw !== "") {
            payload[col] = raw;
            hasRequired = true;
          }
        }

        if (!hasRequired) {
          skipped++;
          continue;
        }

        // Convert numeric fields
        if ("quantity" in payload) payload.quantity = Number(payload.quantity) || 0;
        if ("min_stock" in payload) payload.min_stock = Number(payload.min_stock) || 0;
        if ("unit_cost" in payload) payload.unit_cost = Number(payload.unit_cost) || 0;

        try {
          const res = await fetch(`/api/data/${table}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            const err = (await res.json()) as { error?: string };
            errors.push(`Fila ${imported + skipped + 2}: ${err.error ?? "Error"}`);
            skipped++;
          } else {
            imported++;
          }
        } catch {
          errors.push(`Fila ${imported + skipped + 2}: Error de red`);
          skipped++;
        }
      }

      setResult({ imported, skipped, errors });
      onImported?.();
    } catch {
      setResult({ imported: 0, skipped: 0, errors: ["No se pudo leer el archivo"] });
    } finally {
      setImporting(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleFile}
        className="hidden"
      />
      <button
        type="button"
        disabled={importing}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <Upload className="size-4" /> {importing ? "Importando..." : label}
      </button>

      {result && (
        <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-lg border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {result.imported > 0 && (
            <p className="flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle className="size-4" /> {result.imported} registro(s) importado(s).
            </p>
          )}
          {result.skipped > 0 && (
            <p className="flex items-center gap-2 text-sm text-amber-700">
              <AlertCircle className="size-4" /> {result.skipped} fila(s) omitida(s).
            </p>
          )}
          {result.errors.length > 0 && (
            <ul className="mt-1 max-h-32 space-y-0.5 overflow-y-auto text-xs text-red-600">
              {result.errors.slice(0, 10).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ImportCsv;

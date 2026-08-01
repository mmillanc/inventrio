"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { BaseRecord, FieldConfig } from "@/modules/_core/types";
import type { ReferenceMap } from "@/modules/_core/hooks/useReferences";

interface CrudDialogProps {
  open: boolean;
  title: string;
  fields: FieldConfig[];
  initialValues?: Record<string, unknown> | null;
  references?: ReferenceMap;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => Promise<void> | void;
}

function emptyValues(fields: FieldConfig[]): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

function toFormValues(
  fields: FieldConfig[],
  initial: Record<string, unknown> | null | undefined,
): Record<string, string> {
  if (!initial) return emptyValues(fields);
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      initial[field.name] === null || initial[field.name] === undefined
        ? ""
        : String(initial[field.name]),
    ]),
  );
}

/** Generic create/edit form built from a module field definition. */
export function CrudDialog({
  open,
  title,
  fields,
  initialValues,
  references = {},
  submitLabel = "Guardar",
  onClose,
  onSubmit,
}: CrudDialogProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    toFormValues(fields, initialValues),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValues(toFormValues(fields, initialValues));
      setError(null);
    }
  }, [open, fields, initialValues]);

  if (!open) return null;

  const setValue = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const missing = fields.find((field) => field.required && !values[field.name]);
    if (missing) {
      setError(`El campo "${missing.label}" es obligatorio.`);
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {};
      for (const field of fields) {
        const raw = values[field.name] ?? "";
        payload[field.name] =
          field.type === "number" ? (raw === "" ? 0 : Number(raw)) : raw === "" ? null : raw;
      }
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 dark:bg-slate-950/60">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const id = `field-${field.name}`;
              const common =
                "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200";
              return (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "sm:col-span-2" : undefined}
                >
                  <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {field.label}
                    {field.required && <span className="ml-0.5 text-red-500">*</span>}
                  </label>

                  {field.type === "textarea" && (
                    <textarea
                      id={id}
                      rows={3}
                      value={values[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      className={common}
                    />
                  )}

                  {field.type === "select" && (
                    <select
                      id={id}
                      value={values[field.name] ?? ""}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      className={common}
                    >
                      <option value="">Seleccionar...</option>
                      {(field.options ?? []).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "reference" && (
                    <select
                      id={id}
                      value={values[field.name] ?? ""}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      className={common}
                    >
                      <option value="">Seleccionar...</option>
                      {((references[field.referenceTable ?? ""] ?? []) as BaseRecord[]).map(
                        (row) => (
                          <option key={row.id} value={row.id}>
                            {String(row[field.referenceLabel ?? "name"] ?? row.id)}
                          </option>
                        ),
                      )}
                    </select>
                  )}

                  {["text", "number", "date"].includes(field.type) && (
                    <input
                      id={id}
                      type={field.type}
                      step={field.step}
                      value={values[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      className={common}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">{error}</p>
          )}

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
            >
              {saving ? "Guardando..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrudDialog;

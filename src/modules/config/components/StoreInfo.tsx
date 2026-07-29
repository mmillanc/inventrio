"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/modules/_core/hooks/useSettings";

const FIELDS = [
  { name: "store_name", label: "Nombre del negocio" },
  { name: "store_email", label: "Email" },
  { name: "store_phone", label: "Teléfono" },
  { name: "store_address", label: "Dirección" },
] as const;

export function StoreInfo() {
  const { settings, save } = useSettings();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setValues(
        Object.fromEntries(FIELDS.map((field) => [field.name, String(settings[field.name] ?? "")])),
      );
    }
  }, [settings]);

  return (
    <form
      className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await save(values);
        setSaved(true);
      }}
    >
      {FIELDS.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-slate-700">
            {field.label}
          </label>
          <input
            id={field.name}
            value={values[field.name] ?? ""}
            onChange={(event) => {
              setSaved(false);
              setValues((current) => ({ ...current, [field.name]: event.target.value }));
            }}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Guardar
        </button>
        {saved && <span className="text-sm text-emerald-600">Cambios guardados</span>}
      </div>
    </form>
  );
}

export default StoreInfo;

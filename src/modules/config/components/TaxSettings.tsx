"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/modules/_core/hooks/useSettings";

const CURRENCIES = ["USD", "EUR", "MXN", "COP", "ARS", "CLP", "PEN"];

export function TaxSettings() {
  const { settings, save } = useSettings();
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState("0");
  const [alertDays, setAlertDays] = useState("30");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setCurrency(settings.currency);
      setTaxRate(String(settings.tax_rate));
      setAlertDays(String(settings.expiration_alert_days));
    }
  }, [settings]);

  return (
    <form
      className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await save({
          currency,
          tax_rate: Number(taxRate),
          expiration_alert_days: Number(alertDays),
        });
        setSaved(true);
      }}
    >
      <div>
        <label htmlFor="currency" className="mb-1 block text-sm font-medium text-slate-700">
          Moneda
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(event) => {
            setSaved(false);
            setCurrency(event.target.value);
          }}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tax_rate" className="mb-1 block text-sm font-medium text-slate-700">
          Impuesto (%)
        </label>
        <input
          id="tax_rate"
          type="number"
          step="0.01"
          value={taxRate}
          onChange={(event) => {
            setSaved(false);
            setTaxRate(event.target.value);
          }}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
        />
      </div>

      <div>
        <label htmlFor="alert_days" className="mb-1 block text-sm font-medium text-slate-700">
          Días de anticipación para alertas de vencimiento
        </label>
        <input
          id="alert_days"
          type="number"
          value={alertDays}
          onChange={(event) => {
            setSaved(false);
            setAlertDays(event.target.value);
          }}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
        />
      </div>

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

export default TaxSettings;

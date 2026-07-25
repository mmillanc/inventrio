export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: unknown): string {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "-";
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(n);
}

export function formatCurrency(value: unknown, currency = "USD"): string {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "-";
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(n);
}

export function formatDate(value: unknown): string {
  if (!value) return "-";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function daysUntil(value: unknown): number | null {
  if (!value) return null;
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

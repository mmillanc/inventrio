"use client";

import { useMemo, useState } from "react";
import { Award, FileCheck2, Download, Upload, AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";
import CrudView from "@/modules/_core/components/CrudView";
import ExportTools from "@/modules/_core/components/ExportTools";
import ModuleLayout from "@/modules/_core/components/ModuleLayout";
import StatCard from "@/modules/_core/components/StatCard";
import Tabs from "@/modules/_core/components/Tabs";
import { useToast } from "@/modules/_core/components/Toast";
import { useReferences } from "@/modules/_core/hooks/useReferences";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { formatDate } from "@/lib/utils";
import standardsConfig from "../config";
import type { Standard } from "../types";

const STATUS_CONFIG: Record<string, { label: string; icon: typeof CheckCircle2; className: string }> = {
  active: { label: "Vigente", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  pending: { label: "Pendiente", icon: Clock, className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  expired: { label: "Vencido", icon: XCircle, className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
  revoked: { label: "Revocado", icon: XCircle, className: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300" },
};

const CLASS_LABELS: Record<string, string> = {
  primary: "Primario (CRM)",
  secondary: "Secundario (RM)",
  working: "Estándar de trabajo",
  reference: "Material de referencia",
  certified: "Material certificado (CRM)",
};

const STORAGE_LABELS: Record<string, { label: string; className: string }> = {
  ambient: { label: "Ambiente (15–30 °C)", className: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300" },
  cold: { label: "Refrigerado (2–8 °C)", className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  freezer: { label: "Congelado (−20 °C)", className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" },
  ultra_freezer: { label: "Ultracongelado (−80 °C)", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
  nitrogen: { label: "Nitrógeno líquido", className: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
  dark: { label: "Proteger de la luz", className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  dry: { label: "Lugar seco", className: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
};

function StandardsList() {
  const { rows } = useCrud<Standard>("standards");

  const header = (allRows: Standard[]) => {
    const active = allRows.filter((r) => r.status === "active").length;
    const expired = allRows.filter((r) => r.status === "expired").length;
    const pending = allRows.filter((r) => r.status === "pending").length;
    const withCert = allRows.filter((r) => r.certificate_filename).length;

    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Vigentes" value={active} hint="Estándares activos" tone={active > 0 ? "success" : "default"} />
        <StatCard label="Vencidos" value={expired} hint="Requieren renovación" tone={expired > 0 ? "danger" : "default"} />
        <StatCard label="Pendientes" value={pending} hint="En proceso de certificación" tone={pending > 0 ? "warning" : "default"} />
        <StatCard label="Con certificado" value={withCert} hint="Documentos digitales cargados" />
      </div>
    );
  };

  const rowClassName = (row: Standard) => {
    if (row.status === "expired") return "bg-red-50/60 dark:bg-red-950/20";
    if (row.status === "pending") return "bg-amber-50/60 dark:bg-amber-950/20";
    return "";
  };

  return (
    <CrudView<Standard>
      config={standardsConfig}
      newLabel="Nuevo estándar"
      header={header}
      rowClassName={rowClassName}
    />
  );
}

function CertificatesTab() {
  const { rows, loading, update } = useCrud<Standard>("standards");
  const { toast } = useToast();
  const references = useReferences(["items"]);
  const [uploading, setUploading] = useState<string | null>(null);

  const standardsWithCert = useMemo(() => rows.filter((r) => r.certificate_filename), [rows]);

  const handleUpload = async (standard: Standard, file: File) => {
    setUploading(standard.id);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        await update(standard.id, {
          ...standard,
          certificate_url: base64,
          certificate_filename: file.name,
          certificate_uploaded_at: new Date().toISOString(),
        });
        toast(`Certificado "${file.name}" cargado para ${standard.code}`, "success");
        setUploading(null);
      };
      reader.onerror = () => {
        toast("Error al leer el archivo", "error");
        setUploading(null);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Error al subir certificado", "error");
      setUploading(null);
    }
  };

  const handleDownload = (standard: Standard) => {
    if (!standard.certificate_url) return;
    const link = document.createElement("a");
    link.href = standard.certificate_url;
    link.download = standard.certificate_filename || `certificado-${standard.code}.pdf`;
    link.click();
  };

  const handleRemove = async (standard: Standard) => {
    if (!window.confirm("¿Eliminar el certificado digital? Esta acción no se puede deshacer.")) return;
    try {
      await update(standard.id, {
        ...standard,
        certificate_url: "",
        certificate_filename: "",
        certificate_uploaded_at: null,
      });
      toast("Certificado eliminado", "info");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Error al eliminar", "error");
    }
  };

  const itemName = (id: string | null): string => {
    if (!id) return "—";
    const item = (references.items ?? []).find((r) => r.id === id);
    return String(item?.name ?? "—");
  };

  if (loading) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">Cargando certificados...</p>;
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <Award className="mx-auto mb-3 size-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No hay estándares registrados. Crea un estándar en la pestaña "Estándares" para subir su certificado.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total estándares" value={rows.length} hint="Registrados en el sistema" />
        <StatCard label="Con certificado" value={standardsWithCert.length} hint="Documentos digitales cargados" tone={standardsWithCert.length > 0 ? "success" : "default"} />
        <StatCard label="Sin certificado" value={rows.length - standardsWithCert.length} hint="Pendientes de documentar" tone={rows.length - standardsWithCert.length > 0 ? "warning" : "default"} />
      </div>

      <div className="space-y-3">
        {rows.map((standard) => {
          const status = STATUS_CONFIG[standard.status] ?? STATUS_CONFIG.active;
          const StatusIcon = status.icon;
          const hasCert = Boolean(standard.certificate_filename);

          return (
            <div
              key={standard.id}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-300">
                      <FileCheck2 className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {standard.code} — {standard.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {standard.brand || "Sin marca"} · {standard.standard_type} · {standard.version || "N/A"} · {standard.certification_body || "Sin certificador"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>
                      <StatusIcon className="size-3" /> {status.label}
                    </span>
                    {standard.standard_class && (
                      <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                        {CLASS_LABELS[standard.standard_class] ?? standard.standard_class}
                      </span>
                    )}
                    {standard.storage_condition && (
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${(STORAGE_LABELS[standard.storage_condition] ?? STORAGE_LABELS.ambient).className}`}>
                        {(STORAGE_LABELS[standard.storage_condition] ?? STORAGE_LABELS.ambient).label}
                      </span>
                    )}
                    {standard.weight_received > 0 && (
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        Peso: {standard.weight_received} {standard.weight_unit || "mg"}
                      </span>
                    )}
                    {standard.issue_date && (
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        Emisión: {formatDate(standard.issue_date)}
                      </span>
                    )}
                    {standard.expiry_date && (
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        Vence: {formatDate(standard.expiry_date)}
                      </span>
                    )}
                    {standard.linked_item_id && (
                      <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                        Artículo: {itemName(standard.linked_item_id)}
                      </span>
                    )}
                  </div>

                  {standard.scope && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">{standard.scope}</p>
                  )}
                </div>

                <div className="shrink-0 space-y-2">
                  {hasCert ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950">
                        <FileCheck2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate text-sm font-medium text-emerald-800 dark:text-emerald-200">
                          {standard.certificate_filename}
                        </span>
                      </div>
                      {standard.certificate_uploaded_at && (
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          Subido: {formatDate(standard.certificate_uploaded_at)}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleDownload(standard)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          <Download className="size-3.5" /> Descargar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(standard)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-950"
                        >
                          <XCircle className="size-3.5" /> Eliminar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-teal-400 hover:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-teal-600 dark:hover:bg-teal-950 ${uploading === standard.id ? "opacity-50" : ""}`}
                    >
                      <Upload className="size-3.5" />
                      {uploading === standard.id ? "Subiendo..." : "Subir certificado"}
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                        disabled={uploading === standard.id}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(standard, file);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ComplianceTab() {
  const { rows, loading } = useCrud<Standard>("standards");

  const today = new Date();
  const daysFromNow = (dateStr: string | null) => {
    if (!dateStr) return null;
    const diff = new Date(dateStr).getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const expired = rows.filter((r) => r.status === "expired" || (r.expiry_date && (daysFromNow(r.expiry_date) ?? 999) < 0));
  const expiringSoon = rows.filter((r) => {
    const days = daysFromNow(r.expiry_date);
    return days !== null && days >= 0 && days <= 30 && r.status === "active";
  });
  const reviewsDue = rows.filter((r) => {
    if (!r.next_review_at) return false;
    const days = daysFromNow(r.next_review_at);
    return days !== null && days <= 0;
  });

  if (loading) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">Cargando...</p>;
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Vencidos" value={expired.length} hint="Estándares que requieren renovación inmediata" tone={expired.length > 0 ? "danger" : "success"} />
        <StatCard label="Por vencer (30 días)" value={expiringSoon.length} hint="Vencimiento próximo" tone={expiringSoon.length > 0 ? "warning" : "success"} />
        <StatCard label="Revisiones pendientes" value={reviewsDue.length} hint="Revisiones programadas vencidas" tone={reviewsDue.length > 0 ? "warning" : "success"} />
      </div>

      {expired.length > 0 && (
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
            <AlertTriangle className="size-4" /> Estándares vencidos
          </h3>
          {expired.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-950">
              <div>
                <span className="text-sm font-medium text-red-900 dark:text-red-200">{s.code} — {s.name}</span>
                <span className="ml-2 text-xs text-red-600 dark:text-red-400">Venció: {formatDate(s.expiry_date)}</span>
              </div>
              <span className="text-xs font-medium text-red-700 dark:text-red-300">Acción requerida</span>
            </div>
          ))}
        </div>
      )}

      {expiringSoon.length > 0 && (
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
            <Clock className="size-4" /> Vencimientos próximos (30 días)
          </h3>
          {expiringSoon.map((s) => {
            const days = daysFromNow(s.expiry_date) ?? 0;
            return (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950">
                <div>
                  <span className="text-sm font-medium text-amber-900 dark:text-amber-200">{s.code} — {s.name}</span>
                  <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">Vence: {formatDate(s.expiry_date)}</span>
                </div>
                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">{days} día(s)</span>
              </div>
            );
          })}
        </div>
      )}

      {reviewsDue.length > 0 && (
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-400">
            <Clock className="size-4" /> Revisiones de calidad pendientes
          </h3>
          {reviewsDue.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 dark:border-orange-800 dark:bg-orange-950">
              <div>
                <span className="text-sm font-medium text-orange-900 dark:text-orange-200">{s.code} — {s.name}</span>
                <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">Revisión debida: {formatDate(s.next_review_at)}</span>
              </div>
              <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Programar revisión</span>
            </div>
          ))}
        </div>
      )}

      {expired.length === 0 && expiringSoon.length === 0 && reviewsDue.length === 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950">
          <CheckCircle2 className="mx-auto mb-3 size-10 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Todos los estándares están al día. No hay acciones de cumplimiento pendientes.
          </p>
        </div>
      )}
    </div>
  );
}

export function StandardsView() {
  return (
    <ModuleLayout title={standardsConfig.title} description={standardsConfig.description}>
      <Tabs
        items={[
          { id: "standards", label: "Estándares", content: <StandardsList /> },
          { id: "certificates", label: "Certificados digitales", content: <CertificatesTab /> },
          { id: "compliance", label: "Cumplimiento", content: <ComplianceTab /> },
        ]}
      />
    </ModuleLayout>
  );
}

export default StandardsView;

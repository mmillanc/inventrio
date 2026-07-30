"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import type { BaseRecord, ModuleConfig } from "@/modules/_core/types";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import { useReferences } from "@/modules/_core/hooks/useReferences";
import DataTable from "./DataTable";
import CrudDialog from "./CrudDialog";
import ExportTools from "./ExportTools";
import ModuleLayout from "./ModuleLayout";
import SearchBar from "./SearchBar";

interface CrudViewProps<T extends BaseRecord> {
  config: ModuleConfig;
  title?: string;
  description?: string;
  newLabel?: string;
  /** Extra content rendered above the table (alerts, KPIs, ...). */
  header?: (rows: T[]) => ReactNode;
  filter?: (rows: T[]) => T[];
  rowClassName?: (row: T) => string;
  currency?: string;
}

/** Table + search + export + create/edit/delete for any module with a table. */
export function CrudView<T extends BaseRecord>({
  config,
  title,
  description,
  newLabel,
  header,
  filter,
  rowClassName,
  currency,
}: CrudViewProps<T>) {
  const table = config.table ?? "";
  const { rows, loading, error, create, update, remove } = useCrud<T>(table);
  const referenceTables = useMemo(
    () =>
      Array.from(
        new Set(
          [...config.fields, ...config.columns]
            .map((entry) => ("referenceTable" in entry ? entry.referenceTable : undefined))
            .filter((value): value is string => Boolean(value)),
        ),
      ),
    [config.fields, config.columns],
  );
  const references = useReferences(referenceTables);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);

  const visibleRows = useMemo(() => {
    const base = filter ? filter(rows) : rows;
    const term = search.trim().toLowerCase();
    if (!term) return base;
    return base.filter((row) =>
      config.searchFields.some((field) =>
        String(row[field] ?? "")
          .toLowerCase()
          .includes(term),
      ),
    );
  }, [rows, filter, search, config.searchFields]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await update(editing.id, values);
    else await create(values);
  };

  const handleDelete = async (row: T) => {
    await remove(row.id);
  };

  return (
    <ModuleLayout
      title={title ?? config.title}
      description={description ?? config.description}
      actions={
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <Plus className="size-4" /> {newLabel ?? "Nuevo"}
        </button>
      }
      toolbar={
        <>
          <SearchBar value={search} onChange={setSearch} placeholder={`Buscar en ${config.title.toLowerCase()}...`} />
          <ExportTools filename={config.slug} columns={config.columns} rows={visibleRows} />
        </>
      }
    >
      {header?.(rows)}

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <DataTable<T>
        columns={config.columns}
        rows={visibleRows}
        references={references}
        currency={currency}
        loading={loading}
        rowClassName={rowClassName}
        onEdit={(row) => {
          setEditing(row);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <CrudDialog
        open={dialogOpen}
        title={editing ? `Editar ${config.title.toLowerCase()}` : newLabel ?? `Nuevo registro`}
        fields={config.fields}
        initialValues={editing}
        references={references}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </ModuleLayout>
  );
}

export default CrudView;

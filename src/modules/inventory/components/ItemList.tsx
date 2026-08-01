"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "@/modules/_core/components/DataTable";
import ExportTools from "@/modules/_core/components/ExportTools";
import ImportCsv from "@/modules/_core/components/ImportCsv";
import LabelPrint from "@/modules/_core/components/LabelPrint";
import SearchBar from "@/modules/_core/components/SearchBar";
import StatCard from "@/modules/_core/components/StatCard";
import { useToast } from "@/modules/_core/components/Toast";
import { useReferences } from "@/modules/_core/hooks/useReferences";
import { useSettings } from "@/modules/_core/hooks/useSettings";
import { formatCurrency, formatNumber } from "@/lib/utils";
import inventoryConfig from "../config";
import { useItems } from "../hooks/useItems";
import type { Item } from "../types";
import ItemForm from "./ItemForm";

export function ItemList() {
  const { rows, loading, error, create, update, remove, refresh, lowStock, totalValue } = useItems();
  const { toast } = useToast();
  const references = useReferences(["suppliers"]);
  const { currency } = useSettings();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);

  const visibleRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((item) => {
      const matchesCategory = !category || item.category === category;
      const matchesTerm =
        !term ||
        inventoryConfig.searchFields.some((field) =>
          String(item[field] ?? "").toLowerCase().includes(term),
        );
      return matchesCategory && matchesTerm;
    });
  }, [rows, search, category]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    const sku = String(values.sku ?? "").trim();
    if (sku) {
      const duplicate = rows.find(
        (item) => item.sku.toLowerCase() === sku.toLowerCase() && item.id !== editing?.id,
      );
      if (duplicate) {
        toast(`Ya existe un artículo con el SKU "${sku}": ${duplicate.name}`, "error");
        return;
      }
    }
    try {
      if (editing) {
        await update(editing.id, values);
        toast("Artículo actualizado correctamente", "success");
      } else {
        await create(values);
        toast("Artículo creado correctamente", "success");
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Error al guardar", "error");
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Artículos" value={rows.length} hint="Referencias registradas" />
        <StatCard
          label="Stock bajo"
          value={lowStock.length}
          hint="Por debajo del mínimo"
          tone={lowStock.length > 0 ? "warning" : "success"}
        />
        <StatCard
          label="Valor del inventario"
          value={formatCurrency(totalValue, currency)}
          hint="Cantidad × costo unitario"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por SKU o nombre..." />
          <select
            value={category}
            aria-label="Filtrar por categoría"
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="">Todas las categorías</option>
            {Array.from(new Set(rows.map((item) => item.category).filter(Boolean))).sort().map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="flex gap-2">
          <ImportCsv
            table="items"
            columns={["sku", "name", "category", "unit", "quantity", "min_stock", "unit_cost", "location", "supplier_id", "cas_number", "chemical_formula", "storage_condition"]}
            onImported={refresh}
          />
          <LabelPrint items={visibleRows} />
          <ExportTools filename="inventario" columns={inventoryConfig.columns} rows={visibleRows} />
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <Plus className="size-4" /> Nuevo artículo
          </button>
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">{error}</p>}

      <DataTable<Item>
        columns={inventoryConfig.columns}
        rows={visibleRows}
        references={references}
        currency={currency}
        loading={loading}
        emptyMessage="Aún no hay artículos en el inventario"
        rowClassName={(item) =>
          Number(item.quantity) <= Number(item.min_stock) ? "bg-amber-50/70 dark:bg-amber-950/30" : ""
        }
        onEdit={(item) => {
          setEditing(item);
          setFormOpen(true);
        }}
        onDelete={async (item) => {
          try {
            await remove(item.id);
            toast("Artículo eliminado correctamente", "success");
          } catch (err) {
            toast(err instanceof Error ? err.message : "Error al eliminar", "error");
          }
        }}
      />

      {lowStock.length > 0 && (
        <p className="text-xs text-slate-500">
          {lowStock.length} artículo(s) en o por debajo del stock mínimo (
          {formatNumber(lowStock.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0))}{" "}
          unidades en total).
        </p>
      )}

      <ItemForm
        open={formOpen}
        item={editing}
        references={references}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ItemList;

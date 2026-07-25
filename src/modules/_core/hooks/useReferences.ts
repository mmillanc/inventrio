"use client";

import { useEffect, useState } from "react";
import type { BaseRecord } from "@/modules/_core/types";

export type ReferenceMap = Record<string, BaseRecord[]>;

/** Loads the rows of the tables referenced by a module (for selects and labels). */
export function useReferences(tables: string[]): ReferenceMap {
  const key = tables.join(",");
  const [references, setReferences] = useState<ReferenceMap>({});

  useEffect(() => {
    const list = key ? key.split(",") : [];
    if (list.length === 0) return;
    let cancelled = false;

    void Promise.all(
      list.map(async (table) => {
        const response = await fetch(`/api/data/${table}`);
        const payload = (await response.json()) as { data?: BaseRecord[] };
        return [table, payload.data ?? []] as const;
      }),
    ).then((entries) => {
      if (!cancelled) setReferences(Object.fromEntries(entries));
    });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return references;
}

export function referenceLabel(
  references: ReferenceMap,
  table: string | undefined,
  labelKey: string | undefined,
  id: unknown,
): string {
  if (!table || !id) return "-";
  const row = (references[table] ?? []).find((item) => item.id === id);
  if (!row) return "-";
  return String(row[labelKey ?? "name"] ?? "-");
}

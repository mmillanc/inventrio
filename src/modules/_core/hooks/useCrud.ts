"use client";

import { useCallback, useEffect, useState } from "react";
import type { BaseRecord } from "@/modules/_core/types";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const payload = (await response.json()) as ApiResponse<T>;
  if (!response.ok || payload.error) {
    throw new Error(payload.error ?? "Error de red");
  }
  return payload.data as T;
}

export interface CrudApi<T> {
  rows: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  create: (values: Record<string, unknown>) => Promise<void>;
  update: (id: string, values: Record<string, unknown>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

/** Generic CRUD access to a table through the local data API. */
export function useCrud<T extends BaseRecord>(table: string): CrudApi<T> {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await request<T[]>(`/api/data/${table}`));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const mutate = useCallback(
    async (url: string, method: string, values?: Record<string, unknown>) => {
      try {
        await request<T>(url, {
          method,
          body: values ? JSON.stringify(values) : undefined,
        });
        await refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        throw err;
      }
    },
    [refresh],
  );

  const create = useCallback(
    (values: Record<string, unknown>) => mutate(`/api/data/${table}`, "POST", values),
    [mutate, table],
  );

  const update = useCallback(
    (id: string, values: Record<string, unknown>) =>
      mutate(`/api/data/${table}/${id}`, "PATCH", values),
    [mutate, table],
  );

  const remove = useCallback(
    (id: string) => mutate(`/api/data/${table}/${id}`, "DELETE"),
    [mutate, table],
  );

  return { rows, loading, error, refresh, create, update, remove };
}

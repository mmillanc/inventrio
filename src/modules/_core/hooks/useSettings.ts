"use client";

import { useCallback, useEffect, useState } from "react";
import type { Settings } from "@/modules/_core/types";

/** Reads (and updates) the single settings row of the workspace. */
export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/data/settings");
    const payload = (await response.json()) as { data?: Settings[] };
    setSettings(payload.data?.[0] ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const save = useCallback(
    async (values: Partial<Settings>) => {
      if (!settings) return;
      await fetch(`/api/data/settings/${settings.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      await refresh();
    },
    [settings, refresh],
  );

  return { settings, loading, save, refresh, currency: settings?.currency ?? "USD" };
}

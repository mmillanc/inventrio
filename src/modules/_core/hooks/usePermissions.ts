"use client";

import { useEffect, useState } from "react";
import type { ModuleMetadata, PlanId } from "@/modules/_core/types";

interface ModulesPayload {
  plan: PlanId;
  modules: ModuleMetadata[];
}

/** Reads the active plan and the modules it unlocks. */
export function usePermissions() {
  const [state, setState] = useState<ModulesPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/modules")
      .then((response) => response.json() as Promise<ModulesPayload>)
      .then((payload) => {
        if (!cancelled) {
          setState(payload);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    loading,
    plan: state?.plan ?? null,
    modules: state?.modules ?? [],
    can: (slug: string) => (state?.modules ?? []).some((m) => m.slug === slug),
  };
}

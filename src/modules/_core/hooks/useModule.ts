"use client";

import { usePathname } from "next/navigation";
import { getModuleConfig, listModuleConfigs } from "@/modules/_core/utils/moduleRegistry";
import type { ModuleConfig } from "@/modules/_core/types";

/** Resolves the module matching a slug, or the one in the current URL. */
export function useModule(slug?: string): ModuleConfig | null {
  const pathname = usePathname();
  const current = slug ?? pathname.split("/").filter(Boolean)[0] ?? "";
  return getModuleConfig(current) ?? null;
}

export function useAllModules(): ModuleConfig[] {
  return listModuleConfigs();
}

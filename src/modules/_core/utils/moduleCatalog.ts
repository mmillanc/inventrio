import type { ModuleConfig, ModuleMetadata, PlanId } from "@/modules/_core/types";
import inventoryConfig from "@/modules/inventory/config";
import suppliersConfig from "@/modules/suppliers/config";
import lotsConfig from "@/modules/lots/config";
import expirationsConfig from "@/modules/expirations/config";
import salesConfig from "@/modules/sales/config";
import customersConfig from "@/modules/customers/config";
import reportsConfig from "@/modules/reports/config";
import configModuleConfig from "@/modules/config/config";
import { resolvePlanModules } from "./planResolver";

/**
 * Metadata of every module, keyed by slug. Only imports `config.ts` files so it
 * stays free of component imports (and therefore of import cycles).
 */
export const MODULE_CONFIGS: Record<string, ModuleConfig> = {
  [inventoryConfig.slug]: inventoryConfig,
  [suppliersConfig.slug]: suppliersConfig,
  [lotsConfig.slug]: lotsConfig,
  [expirationsConfig.slug]: expirationsConfig,
  [salesConfig.slug]: salesConfig,
  [customersConfig.slug]: customersConfig,
  [reportsConfig.slug]: reportsConfig,
  [configModuleConfig.slug]: configModuleConfig,
};

export function getModuleConfig(slug: string): ModuleConfig | undefined {
  return MODULE_CONFIGS[slug];
}

export function listModuleConfigs(): ModuleConfig[] {
  return Object.values(MODULE_CONFIGS).sort((a, b) => a.order - b.order);
}

/** Modules enabled for a plan: declared in the plan file and accepted by the module. */
export function getModulesForPlan(plan: PlanId): ModuleConfig[] {
  const enabled = resolvePlanModules(plan);
  return listModuleConfigs().filter(
    (config) => enabled.includes(config.slug) && config.plans.includes(plan),
  );
}

export function toMetadata(config: ModuleConfig): ModuleMetadata {
  return {
    id: config.id,
    slug: config.slug,
    title: config.title,
    description: config.description,
    icon: config.icon,
    order: config.order,
  };
}

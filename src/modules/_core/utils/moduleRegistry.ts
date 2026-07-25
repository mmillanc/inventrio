import type { ModuleConfig, ModuleDefinition, ModuleMetadata, PlanId } from "@/modules/_core/types";
import inventoryModule from "@/modules/inventory";
import suppliersModule from "@/modules/suppliers";
import lotsModule from "@/modules/lots";
import expirationsModule from "@/modules/expirations";
import salesModule from "@/modules/sales";
import customersModule from "@/modules/customers";
import reportsModule from "@/modules/reports";
import configModule from "@/modules/config";
import { resolvePlanModules } from "./planResolver";

/** Every module known to the app, keyed by slug. */
export const MODULE_REGISTRY: Record<string, ModuleDefinition> = {
  [inventoryModule.config.slug]: inventoryModule,
  [suppliersModule.config.slug]: suppliersModule,
  [lotsModule.config.slug]: lotsModule,
  [expirationsModule.config.slug]: expirationsModule,
  [salesModule.config.slug]: salesModule,
  [customersModule.config.slug]: customersModule,
  [reportsModule.config.slug]: reportsModule,
  [configModule.config.slug]: configModule,
};

export function getModule(slug: string): ModuleDefinition | undefined {
  return MODULE_REGISTRY[slug];
}

export function getModuleConfig(slug: string): ModuleConfig | undefined {
  return MODULE_REGISTRY[slug]?.config;
}

export function listModuleConfigs(): ModuleConfig[] {
  return Object.values(MODULE_REGISTRY)
    .map((module) => module.config)
    .sort((a, b) => a.order - b.order);
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

import type { ModuleDefinition } from "@/modules/_core/types";
import inventoryModule from "@/modules/inventory";
import suppliersModule from "@/modules/suppliers";
import lotsModule from "@/modules/lots";
import expirationsModule from "@/modules/expirations";
import salesModule from "@/modules/sales";
import customersModule from "@/modules/customers";
import reportsModule from "@/modules/reports";
import operatorsModule from "@/modules/operators";
import configModule from "@/modules/config";

/** Every module known to the app (metadata + screen), keyed by slug. */
export const MODULE_REGISTRY: Record<string, ModuleDefinition> = {
  [inventoryModule.config.slug]: inventoryModule,
  [suppliersModule.config.slug]: suppliersModule,
  [lotsModule.config.slug]: lotsModule,
  [expirationsModule.config.slug]: expirationsModule,
  [salesModule.config.slug]: salesModule,
  [customersModule.config.slug]: customersModule,
  [reportsModule.config.slug]: reportsModule,
  [operatorsModule.config.slug]: operatorsModule,
  [configModule.config.slug]: configModule,
};

export function getModule(slug: string): ModuleDefinition | undefined {
  return MODULE_REGISTRY[slug];
}

export {
  MODULE_CONFIGS,
  getModuleConfig,
  listModuleConfigs,
  getModulesForPlan,
  toMetadata,
} from "./moduleCatalog";

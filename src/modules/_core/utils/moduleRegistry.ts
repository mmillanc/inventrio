import type { ModuleDefinition } from "@/modules/_core/types";
import inventoryModule from "@/modules/inventory";
import suppliersModule from "@/modules/suppliers";
import lotsModule from "@/modules/lots";
import expirationsModule from "@/modules/expirations";
import salesModule from "@/modules/sales";
import customersModule from "@/modules/customers";
import reportsModule from "@/modules/reports";
import operatorsModule from "@/modules/operators";
import standardsModule from "@/modules/standards";
import stockLocationsModule from "@/modules/stock_locations";
import receivingsModule from "@/modules/receivings";
import itemKitsModule from "@/modules/item_kits";
import giftcardsModule from "@/modules/giftcards";
import expensesModule from "@/modules/expenses";
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
  [standardsModule.config.slug]: standardsModule,
  [stockLocationsModule.config.slug]: stockLocationsModule,
  [receivingsModule.config.slug]: receivingsModule,
  [itemKitsModule.config.slug]: itemKitsModule,
  [giftcardsModule.config.slug]: giftcardsModule,
  [expensesModule.config.slug]: expensesModule,
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

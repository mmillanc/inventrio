import type { ModuleDefinition } from "@/modules/_core/types";
import expirationsConfig from "./config";
import ExpirationsView from "./components/ExpirationsView";

export const expirationsModule: ModuleDefinition = {
  config: expirationsConfig,
  View: ExpirationsView,
};

export { expirationsConfig };
export { default as ExpirationAlert } from "./components/ExpirationAlert";
export { default as ExpirationCalendar } from "./components/ExpirationCalendar";
export { useExpirations } from "./hooks/useExpirations";
export type { ExpirationEntry, ExpirationState } from "./types";

export default expirationsModule;

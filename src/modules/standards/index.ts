import type { ModuleDefinition } from "@/modules/_core/types";
import standardsConfig from "./config";
import { StandardsView } from "./components/StandardsView";

export const standardsModule: ModuleDefinition = {
  config: standardsConfig,
  View: StandardsView,
};

export { standardsConfig };
export { StandardsView } from "./components/StandardsView";
export { useStandards } from "./hooks/useStandards";
export type { Standard } from "./types";

export default standardsModule;

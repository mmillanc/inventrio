import type { ModuleDefinition } from "@/modules/_core/types";
import reportsConfig from "./config";
import ReportBuilder from "./components/ReportBuilder";

export const reportsModule: ModuleDefinition = {
  config: reportsConfig,
  View: ReportBuilder,
};

export { reportsConfig };
export { default as ReportBuilder } from "./components/ReportBuilder";
export { default as ChartWidget } from "./components/ChartWidget";
export { default as ExportPanel } from "./components/ExportPanel";
export { useReports } from "./hooks/useReports";
export type { Report, ReportId, ReportPoint } from "./types";

export default reportsModule;

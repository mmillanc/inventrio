"use client";

import ModuleLayout from "@/modules/_core/components/ModuleLayout";
import Tabs from "@/modules/_core/components/Tabs";
import configModuleConfig from "../config";
import PlanSelector from "./PlanSelector";
import StoreInfo from "./StoreInfo";
import TaxSettings from "./TaxSettings";

export function ConfigView() {
  return (
    <ModuleLayout title={configModuleConfig.title} description={configModuleConfig.description}>
      <Tabs
        items={[
          { id: "store", label: "Negocio", content: <StoreInfo /> },
          { id: "tax", label: "Impuestos y alertas", content: <TaxSettings /> },
          { id: "plan", label: "Plan", content: <PlanSelector /> },
        ]}
      />
    </ModuleLayout>
  );
}

export default ConfigView;

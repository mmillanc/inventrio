"use client";

import ModuleLayout from "@/modules/_core/components/ModuleLayout";
import Tabs from "@/modules/_core/components/Tabs";
import operatorsConfig from "../config";
import OperatorList from "./OperatorList";
import AuditView from "./AuditView";

export function OperatorsView() {
  return (
    <ModuleLayout title={operatorsConfig.title} description={operatorsConfig.description}>
      <Tabs
        items={[
          { id: "operators", label: "Operadores", content: <OperatorList /> },
          { id: "audit", label: "Auditoría", content: <AuditView /> },
        ]}
      />
    </ModuleLayout>
  );
}

export default OperatorsView;

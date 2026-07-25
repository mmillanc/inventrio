"use client";

import ModuleLayout from "@/modules/_core/components/ModuleLayout";
import Tabs from "@/modules/_core/components/Tabs";
import expirationsConfig from "../config";
import ExpirationAlert from "./ExpirationAlert";
import ExpirationCalendar from "./ExpirationCalendar";

export function ExpirationsView() {
  return (
    <ModuleLayout title={expirationsConfig.title} description={expirationsConfig.description}>
      <Tabs
        items={[
          { id: "alerts", label: "Alertas", content: <ExpirationAlert /> },
          { id: "calendar", label: "Calendario", content: <ExpirationCalendar /> },
        ]}
      />
    </ModuleLayout>
  );
}

export default ExpirationsView;

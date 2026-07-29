"use client";

import Tabs from "@/modules/_core/components/Tabs";
import LotList from "./LotList";
import LotTraceability from "./LotTraceability";

export function LotsView() {
  return (
    <Tabs
      items={[
        { id: "lots", label: "Lotes", content: <LotList /> },
        { id: "traceability", label: "Trazabilidad", content: <LotTraceability /> },
      ]}
    />
  );
}

export default LotsView;

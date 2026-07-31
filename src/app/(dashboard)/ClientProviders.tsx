"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/modules/_core/components/Toast";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}

export default ClientProviders;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

/** Global keyboard shortcuts for navigation and actions. */
export function useKeyboardShortcuts(extra?: Shortcut[]) {
  const router = useRouter();

  useEffect(() => {
    const baseShortcuts: Shortcut[] = [
      { key: "g", description: "Ir al Dashboard", action: () => router.push("/") },
      { key: "i", description: "Ir a Inventario", action: () => router.push("/inventory") },
      { key: "l", description: "Ir a Lotes", action: () => router.push("/lots") },
      { key: "e", description: "Ir a Vencimientos", action: () => router.push("/expirations") },
      { key: "s", description: "Ir a Proveedores", action: () => router.push("/suppliers") },
      { key: "o", description: "Ir a Operadores", action: () => router.push("/operators") },
      { key: "r", description: "Ir a Reportes", action: () => router.push("/reports") },
      { key: "c", description: "Ir a Configuración", action: () => router.push("/config") },
      { key: "/", description: "Enfocar búsqueda del sidebar", action: () => {
        const input = document.querySelector<HTMLInputElement>('input[placeholder*="Buscar artículo"]');
        input?.focus();
      }},
      { key: "d", shift: true, description: "Alternar modo oscuro", action: () => {
        const isDark = document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", !isDark);
        localStorage.setItem("inventrio-theme", isDark ? "light" : "dark");
      }},
      { key: "k", ctrl: true, description: "Búsqueda global", action: () => {
        const input = document.querySelector<HTMLInputElement>('input[placeholder*="Buscar artículo"]');
        input?.focus();
      }},
    ];

    const allShortcuts = [...baseShortcuts, ...(extra ?? [])];

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
        // Allow Escape to blur
        if (event.key === "Escape") {
          target.blur();
        }
        return;
      }

      for (const shortcut of allShortcuts) {
        const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : true;
        if (ctrlMatch && shiftMatch && event.key.toLowerCase() === shortcut.key.toLowerCase()) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router, extra]);
}

export const SHORTCUT_HINTS = [
  { keys: "G", description: "Dashboard" },
  { keys: "I", description: "Inventario" },
  { keys: "L", description: "Lotes" },
  { keys: "E", description: "Vencimientos" },
  { keys: "S", description: "Proveedores" },
  { keys: "O", description: "Operadores" },
  { keys: "R", description: "Reportes" },
  { keys: "C", description: "Configuración" },
  { keys: "/", description: "Búsqueda" },
  { keys: "Shift+D", description: "Modo oscuro" },
  { keys: "Ctrl+K", description: "Búsqueda global" },
];

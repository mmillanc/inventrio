"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Boxes, HelpCircle, Keyboard, LayoutDashboard, LogOut, Menu, Search } from "lucide-react";
import ModuleIcon from "@/modules/_core/components/ModuleIcon";
import ThemeToggle from "@/components/ThemeToggle";
import { useKeyboardShortcuts } from "@/modules/_core/hooks/useKeyboardShortcuts";
import { cn } from "@/lib/utils";
import type { BaseRecord, ModuleMetadata, PlanId } from "@/modules/_core/types";
import { logout } from "@/app/(auth)/actions";

interface SidebarProps {
  modules: ModuleMetadata[];
  plan: PlanId;
}

const planLabel: Record<PlanId, string> = {
  laboratorio: "InventaLab",
  pyme: "InventaShop",
};

interface SearchItem extends BaseRecord {
  sku: string;
  name: string;
  category: string;
}

export function Sidebar({ modules, plan }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);

  useKeyboardShortcuts();

  useEffect(() => {
    void fetch("/api/data/items")
      .then((res) => res.json())
      .then((payload: { data?: SearchItem[] }) => setItems(payload.data ?? []))
      .catch(() => setItems([]));
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return items
      .filter(
        (item) =>
          item.sku?.toLowerCase().includes(term) ||
          item.name?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term),
      )
      .slice(0, 6);
  }, [items, query]);

  const links = [
    { slug: "", title: "Dashboard", icon: "dashboard" },
    ...modules.map((module) => ({ slug: module.slug, title: module.title, icon: module.icon })),
    { slug: "faq", title: "FAQ", icon: "faq" },
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen((value) => !value)}
        className="fixed left-4 top-4 z-40 rounded-lg border border-slate-200 bg-white p-2 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-700 dark:bg-slate-900 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <Boxes className="size-6 text-teal-600" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">Inventrio</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{planLabel[plan]}</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="relative border-b border-slate-100 px-3 py-3 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              placeholder="Buscar artículo..."
              className="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
          </div>
          {showResults && results.length > 0 && (
            <div className="absolute left-3 right-3 top-full z-50 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href="/inventory"
                  onClick={() => {
                    setQuery("");
                    setShowResults(false);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between gap-2 px-3 py-2 text-sm transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <span className="truncate text-slate-700">{item.name}</span>
                  <span className="shrink-0 text-xs text-slate-400">{item.sku}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {links.map((link) => {
            const href = link.slug ? `/${link.slug}` : "/";
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                )}
              >
                {link.icon === "dashboard" ? (
                  <LayoutDashboard className="size-4" />
                ) : link.icon === "faq" ? (
                  <HelpCircle className="size-4" />
                ) : (
                  <ModuleIcon name={link.icon} className="size-4" />
                )}
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <div className="mb-1 flex items-center gap-2 px-3 text-xs text-slate-400 dark:text-slate-500">
            <Keyboard className="size-3" />
            <span>Atajos: G·I·L·E·S·O·R·C · / · Shift+D</span>
          </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <LogOut className="size-4" /> Cerrar sesión
          </button>
        </form>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

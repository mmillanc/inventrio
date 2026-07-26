"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Boxes, LayoutDashboard, LogOut, Menu } from "lucide-react";
import ModuleIcon from "@/modules/_core/components/ModuleIcon";
import { cn } from "@/lib/utils";
import type { ModuleMetadata, PlanId } from "@/modules/_core/types";
import { logout } from "@/app/(auth)/actions";

interface SidebarProps {
  modules: ModuleMetadata[];
  plan: PlanId;
}

const planLabel: Record<PlanId, string> = {
  laboratorio: "InventaLab",
  pyme: "InventaShop",
};

export function Sidebar({ modules, plan }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { slug: "", title: "Dashboard", icon: "dashboard" },
    ...modules.map((module) => ({ slug: module.slug, title: module.title, icon: module.icon })),
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen((value) => !value)}
        className="fixed left-4 top-4 z-40 rounded-lg border border-slate-200 bg-white p-2 text-slate-600 lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
          <Boxes className="size-6 text-teal-600" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">Inventrio</p>
            <p className="text-xs text-slate-500">{planLabel[plan]}</p>
          </div>
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
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {link.icon === "dashboard" ? (
                  <LayoutDashboard className="size-4" />
                ) : (
                  <ModuleIcon name={link.icon} className="size-4" />
                )}
                {link.title}
              </Link>
            );
          })}
        </nav>

        <form action={logout} className="border-t border-slate-100 p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <LogOut className="size-4" /> Cerrar sesión
          </button>
        </form>
      </aside>
    </>
  );
}

export default Sidebar;

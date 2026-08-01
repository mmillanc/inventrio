"use client";

import type { ReactNode } from "react";

interface ModuleLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
}

/** Common frame for every module screen. */
export function ModuleLayout({
  title,
  description,
  actions,
  toolbar,
  children,
}: ModuleLayoutProps) {
  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
          {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </header>
      {toolbar && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {toolbar}
        </div>
      )}
      {children}
    </section>
  );
}

export default ModuleLayout;

"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items, title, subtitle, docsLink }: { items: FaqItem[]; title?: string; subtitle?: string; docsLink?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50/50 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-medium text-teal-700">
            <HelpCircle className="size-3.5" />
            Preguntas frecuentes
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {title ?? "Resolvemos tus dudas"}
          </h2>
          {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
        </div>
        <div className="mt-12 space-y-3">
          {items.map((faq, index) => (
            <div key={faq.q} className="rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                {open === index ? (
                  <ChevronUp className="size-5 shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown className="size-5 shrink-0 text-slate-400" />
                )}
              </button>
              {open === index && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
        {docsLink && (
          <div className="mt-8 text-center">
            <Link
              href={docsLink}
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition hover:text-teal-700"
            >
              Ver documentación completa
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FaqAccordion;

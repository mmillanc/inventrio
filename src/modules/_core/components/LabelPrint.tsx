"use client";

import { useRef } from "react";
import { Printer, X } from "lucide-react";
import type { BaseRecord } from "@/modules/_core/types";

interface LabelItem extends BaseRecord {
  sku: string;
  name: string;
  category: string;
  quantity?: number;
  unit?: string;
}

interface LabelPrintProps {
  items: LabelItem[];
}

function generateBarcodeSvg(value: string, height = 40): string {
  const bars: string[] = [];
  const chars = value.padEnd(12, "0").split("");
  for (let i = 0; i < chars.length; i++) {
    const code = chars[i].charCodeAt(0);
    const width = (code % 3) + 1;
    const isSpace = i % 2 === 1;
    const color = isSpace ? "#ffffff" : "#000000";
    bars.push(`<rect x="${i * 4}" y="0" width="${width}" height="${height}" fill="${color}"/>`);
  }
  const totalWidth = chars.length * 4 + 4;
  return `<svg width="${totalWidth}" height="${height}" xmlns="http://www.w3.org/2000/svg">${bars.join("")}</svg>`;
}

export function LabelPrint({ items }: LabelPrintProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    const labels = printRef.current.innerHTML;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Etiquetas - Inventrio</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: ui-sans-serif, system-ui, sans-serif; background: #fff; }
          .label-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 16px;
            max-width: 800px;
          }
          .label {
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            page-break-inside: avoid;
          }
          .label-name {
            font-size: 13px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 4px;
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .label-sku {
            font-size: 11px;
            color: #64748b;
            margin-bottom: 6px;
          }
          .label-category {
            font-size: 10px;
            color: #0d9488;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 6px;
          }
          .label-barcode {
            display: flex;
            justify-content: center;
            margin-bottom: 4px;
          }
          .label-code {
            font-size: 10px;
            font-family: ui-monospace, monospace;
            color: #334155;
          }
          @media print {
            .label-grid { gap: 4px; padding: 8px; }
            @page { margin: 8mm; }
          }
        </style>
      </head>
      <body>
        <div class="label-grid">${labels}</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  if (items.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        title="Imprimir etiquetas de los artículos visibles"
      >
        <Printer className="size-4" /> Etiquetas
      </button>

      <div ref={printRef} className="hidden">
        {items.map((item) => (
          <div key={item.id} className="label">
            <div className="label-name">{item.name}</div>
            <div className="label-sku">SKU: {item.sku || "N/A"}</div>
            <div className="label-category">{item.category || "Sin categoría"}</div>
            <div
              className="label-barcode"
              dangerouslySetInnerHTML={{ __html: generateBarcodeSvg(item.sku || item.id) }}
            />
            <div className="label-code">{item.sku || item.id.slice(0, 8)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LabelPrint;

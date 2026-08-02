import Link from "next/link";
import { Boxes } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-teal-600">
              <Boxes className="size-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">Inventrio</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 sm:gap-6">
            <Link href="/inventalab" className="transition hover:text-slate-900">InventaLab</Link>
            <Link href="/inventashop" className="transition hover:text-slate-900">InventaShop</Link>
            <Link href="/faq" className="transition hover:text-slate-900">FAQ</Link>
            <Link href="/login" className="transition hover:text-slate-900">Iniciar sesión</Link>
            <Link href="/register" className="transition hover:text-slate-900">Crear cuenta</Link>
          </div>
        </div>
        <div className="mt-6 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Inventrio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;

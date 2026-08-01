import Link from "next/link";
import { Boxes } from "lucide-react";

interface LandingNavProps {
  active?: "home" | "lab" | "shop";
}

export function LandingNav({ active }: LandingNavProps) {
  const linkClass = (key: string) =>
    `hidden text-sm font-medium transition sm:inline ${
      active === key
        ? "text-teal-600"
        : "text-slate-600 hover:text-teal-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-teal-600">
            <Boxes className="size-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Inventrio</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/inventalab" className={linkClass("lab")}>InventaLab</Link>
          <Link href="/inventashop" className={linkClass("shop")}>InventaShop</Link>
          <Link href="/login" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">Iniciar sesi&oacute;n</Link>
          <Link href="/register" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md">Crear cuenta</Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;

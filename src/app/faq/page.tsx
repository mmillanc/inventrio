import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FaqContent from "@/components/FaqContent";
import { LandingNav } from "@/components/LandingNav";
import { LandingFooter } from "@/components/LandingFooter";

export const dynamic = "force-dynamic";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <LandingNav />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>
        <FaqContent />
      </div>
      <LandingFooter />
    </div>
  );
}

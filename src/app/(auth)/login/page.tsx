"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Boxes } from "lucide-react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="size-4" />
        Volver al inicio
      </Link>

      <div className="mb-6 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-teal-600">
          <Boxes className="size-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Inventrio</h1>
          <p className="text-sm text-slate-500">Inventario para laboratorios y pymes</p>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="user" className="mb-1 block text-sm font-medium text-slate-700">
            Usuario
          </label>
          <input
            id="user"
            name="user"
            defaultValue="admin"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="font-medium text-teal-600 hover:underline">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}

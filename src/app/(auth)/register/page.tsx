"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Boxes, FlaskConical, ShoppingBag } from "lucide-react";
import { register } from "../actions";

export default function RegisterPage() {
  const [error, formAction, pending] = useActionState(register, null);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
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
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Crear cuenta</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Elige tu plan y accede a Inventrio</p>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="user" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Usuario
          </label>
          <input
            id="user"
            name="user"
            required
            autoComplete="username"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Confirmar contraseña
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">Plan</span>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 transition has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500 dark:border-slate-700 dark:bg-slate-800">
              <input
                type="radio"
                name="plan"
                value="laboratorio"
                defaultChecked
                className="sr-only"
              />
              <FlaskConical className="size-5 text-teal-600" />
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">InventaLab</span>
            </label>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 transition has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500 dark:border-slate-700 dark:bg-slate-800">
              <input type="radio" name="plan" value="pyme" className="sr-only" />
              <ShoppingBag className="size-5 text-teal-600" />
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">InventaShop</span>
            </label>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">{error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-teal-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

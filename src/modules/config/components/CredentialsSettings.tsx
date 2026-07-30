"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/modules/_core/hooks/useSettings";

export function CredentialsSettings() {
  const { settings, save } = useSettings();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setUser(settings.admin_user ?? "");
    }
  }, [settings]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!user.trim()) {
      setError("El usuario es obligatorio.");
      return;
    }

    if (password && password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password && password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    const values: Record<string, unknown> = { admin_user: user.trim() };
    if (password) {
      values.admin_password = password;
    }

    await save(values);
    setSaved(true);
    setPassword("");
    setConfirm("");
  };

  return (
    <form
      className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="admin_user" className="mb-1 block text-sm font-medium text-slate-700">
          Usuario
        </label>
        <input
          id="admin_user"
          value={user}
          onChange={(event) => {
            setSaved(false);
            setError(null);
            setUser(event.target.value);
          }}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
      </div>

      <div>
        <label htmlFor="admin_password" className="mb-1 block text-sm font-medium text-slate-700">
          Nueva contraseña
        </label>
        <input
          id="admin_password"
          type="password"
          value={password}
          onChange={(event) => {
            setSaved(false);
            setError(null);
            setPassword(event.target.value);
          }}
          placeholder="Dejar en blanco para mantener la actual"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
      </div>

      <div>
        <label htmlFor="admin_confirm" className="mb-1 block text-sm font-medium text-slate-700">
          Confirmar nueva contraseña
        </label>
        <input
          id="admin_confirm"
          type="password"
          value={confirm}
          onChange={(event) => {
            setSaved(false);
            setError(null);
            setConfirm(event.target.value);
          }}
          placeholder="Repetir contraseña"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Guardar credenciales
        </button>
        {saved && <span className="text-sm text-emerald-600">Credenciales actualizadas</span>}
      </div>

      <p className="text-xs text-slate-400">
        La contraseña se hashea con bcrypt antes de guardarse. Si solo cambias el usuario, la contraseña actual se mantiene.
      </p>
    </form>
  );
}

export default CredentialsSettings;

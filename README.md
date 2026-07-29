# Inventrio

Aplicación web modular de inventario para **laboratorios** y **pymes**, construida con Next.js (App Router), TypeScript y Tailwind CSS.

Cada funcionalidad vive en `src/modules/<módulo>` y se activa según el **plan** (`plans/laboratorio.json`, `plans/pyme.json`). El sidebar, el dashboard y las rutas se generan a partir del registro de módulos.

## Estado actual

- **Plan Laboratorio: funcional** → Inventario (artículos + movimientos de stock), Proveedores, Lotes (con trazabilidad), Vencimientos (alertas + calendario), Reportes y Configuración.
- **Plan Pyme: básico** → Ventas y Clientes con CRUD genérico (el POS y la facturación quedan pendientes).
- **Persistencia: modo local**. Los datos se guardan en `.data/db.json` (ignorado por git) y se siembran con datos de demo la primera vez. Las migraciones de Supabase ya están escritas en `supabase/migrations` para migrar cuando exista el proyecto.

## Ejecutar

```bash
npm install
npm run dev       # http://localhost:3000
```

Login por defecto: **admin / inventrio** (configurable con `APP_USER` y `APP_PASSWORD`).

Otros comandos:

```bash
npm run lint
npm run typecheck
npm run build
npm run db:reset   # borra .data/ y vuelve a sembrar los datos de demo
```

## Estructura

```
src/
  app/
    (auth)/login          # login local con cookie de sesión
    (dashboard)/          # layout con sidebar dinámico + dashboard por plan
      [...slug]/          # renderiza cualquier módulo del registro
    api/
      modules/            # metadata de los módulos del plan activo
      data/[table]/       # CRUD genérico sobre el store local
  modules/
    _core/                # tipos, componentes (DataTable, CrudDialog, ...), hooks, registro
    inventory/ suppliers/ lots/ expirations/ reports/ config/ sales/ customers/
  lib/
    db/                   # store local (JSON) + seed
    supabase/             # clientes listos para el modo Supabase
plans/                    # definición de planes
supabase/migrations/      # esquema SQL por módulo
```

Un módulo expone `config` (metadata, campos y columnas) y `View` (su pantalla) desde su `index.ts`; añadirlo a `MODULE_REGISTRY` y al JSON del plan basta para que aparezca en el menú y en `/<slug>`.

## Migrar a Supabase

1. Crear el proyecto y aplicar `supabase/migrations/*.sql` (y opcionalmente `supabase/seed.sql`).
2. Definir `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`.
3. Sustituir las lecturas/escrituras de `src/lib/db/local.ts` en `src/app/api/data/[table]` por los clientes de `src/lib/supabase`. El resto de la app usa el hook `useCrud`, por lo que no cambia.

## Diferencias con el esquema propuesto

- El formulario genérico `CrudDialog` reemplaza a los `*Form.tsx` de cada módulo (solo inventario mantiene `ItemForm` por sus campos propios).
- El esquema SQL vive únicamente en `supabase/migrations` (no se duplica en un `schema.sql` por módulo).
- `PosRegister` e `InvoiceGenerator` del plan Pyme aún no están implementados.

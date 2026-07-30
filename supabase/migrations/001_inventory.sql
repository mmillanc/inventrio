-- Inventory module (Laboratorio + Pyme).
create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  sku text not null,
  name text not null,
  category text not null default 'otros',
  unit text not null default 'unidad',
  quantity numeric not null default 0,
  min_stock numeric not null default 0,
  unit_cost numeric not null default 0,
  location text default '',
  cas_number text default '',
  chemical_formula text default '',
  storage_condition text default '',
  supplier_id uuid, -- FK added in 002_suppliers.sql
  notes text default '',
  created_at timestamptz not null default now()
);

create unique index if not exists items_sku_idx on items (sku);

create table if not exists stock_movements (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references items (id) on delete cascade,
  lot_id uuid,
  type text not null check (type in ('in', 'out', 'adjust')),
  quantity numeric not null,
  reason text default '',
  moved_at date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists stock_movements_item_idx on stock_movements (item_id);
create index if not exists stock_movements_date_idx on stock_movements (moved_at desc);

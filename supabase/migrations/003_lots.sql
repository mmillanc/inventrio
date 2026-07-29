-- Lots module (plan Laboratorio).
create table if not exists lots (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  item_id uuid not null references items (id) on delete cascade,
  supplier_id uuid references suppliers (id) on delete set null,
  quantity numeric not null default 0,
  manufactured_at date,
  expires_at date not null,
  status text not null default 'activo'
    check (status in ('activo', 'cuarentena', 'agotado', 'retirado')),
  notes text default '',
  created_at timestamptz not null default now()
);

create unique index if not exists lots_code_idx on lots (code);
create index if not exists lots_expires_idx on lots (expires_at);

alter table stock_movements
  add constraint stock_movements_lot_id_fkey
  foreign key (lot_id) references lots (id) on delete set null;

-- Sales module (plan Pyme). The customer FK is added in 006_customers.sql.
create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  sold_at date not null default current_date,
  customer_id uuid,
  item_id uuid not null references items (id) on delete restrict,
  quantity numeric not null default 1,
  unit_price numeric not null default 0,
  payment_method text default 'efectivo',
  notes text default '',
  created_at timestamptz not null default now()
);

create index if not exists sales_date_idx on sales (sold_at desc);

-- 012_pyme_modules.sql
-- Stock locations, receivings, item kits, giftcards, expenses, and enhanced sales.

-- ── Stock locations ──────────────────────────────────────────────
create table if not exists stock_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null default '',
  address text default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists stock_locations_code_idx on stock_locations (code);
create index if not exists stock_locations_active_idx on stock_locations (is_active);

-- Add stock_location_id to items (nullable, defaults to first location)
alter table items add column if not exists stock_location_id uuid references stock_locations (id) on delete set null;

-- ── Sales (enhanced) ──────────────────────────────────────────────
-- Add columns for POS register mode
alter table sales add column if not exists sale_mode text not null default 'sale'
  check (sale_mode in ('sale', 'quote', 'work_order', 'invoice', 'return'));
alter table sales add column if not exists status text not null default 'completed'
  check (status in ('completed', 'suspended', 'cancelled'));
alter table sales add column if not exists subtotal numeric not null default 0;
alter table sales add column if not exists discount numeric not null default 0;
alter table sales add column if not exists tax_amount numeric not null default 0;
alter table sales add column if not exists total numeric not null default 0;
alter table sales add column if not exists stock_location_id uuid references stock_locations (id) on delete set null;
alter table sales add column if not exists reference text default '';

create index if not exists sales_status_idx on sales (status);
create index if not exists sales_mode_idx on sales (sale_mode);
create index if not exists sales_customer_idx on sales (customer_id);

-- ── Receivings (compras / recepción de mercancía) ─────────────────
create table if not exists receivings (
  id uuid primary key default gen_random_uuid(),
  received_at date not null default current_date,
  supplier_id uuid references suppliers (id) on delete set null,
  stock_location_id uuid references stock_locations (id) on delete set null,
  mode text not null default 'receive' check (mode in ('receive', 'return', 'requisition')),
  reference text default '',
  comment text default '',
  total numeric not null default 0,
  status text not null default 'completed' check (status in ('completed', 'pending', 'cancelled')),
  created_at timestamptz not null default now()
);
create index if not exists receivings_date_idx on receivings (received_at desc);
create index if not exists receivings_supplier_idx on receivings (supplier_id);

-- Receiving items (line items for each receiving)
create table if not exists receiving_items (
  id uuid primary key default gen_random_uuid(),
  receiving_id uuid not null references receivings (id) on delete cascade,
  item_id uuid not null references items (id) on delete restrict,
  quantity numeric not null default 1,
  unit_cost numeric not null default 0,
  discount numeric not null default 0,
  total numeric not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists receiving_items_receiving_idx on receiving_items (receiving_id);
create index if not exists receiving_items_item_idx on receiving_items (item_id);

-- ── Item kits (packs) ────────────────────────────────────────────
create table if not exists item_kits (
  id uuid primary key default gen_random_uuid(),
  kit_code text not null,
  name text not null,
  description text default '',
  total_cost_price numeric not null default 0,
  total_unit_price numeric not null default 0,
  created_at timestamptz not null default now()
);
create unique index if not exists item_kits_code_idx on item_kits (kit_code);

-- Kit items (components of each kit)
create table if not exists item_kit_items (
  id uuid primary key default gen_random_uuid(),
  kit_id uuid not null references item_kits (id) on delete cascade,
  item_id uuid not null references items (id) on delete restrict,
  quantity numeric not null default 1,
  created_at timestamptz not null default now()
);
create index if not exists item_kit_items_kit_idx on item_kit_items (kit_id);
create index if not exists item_kit_items_item_idx on item_kit_items (item_id);

-- ── Gift cards ───────────────────────────────────────────────────
create table if not exists giftcards (
  id uuid primary key default gen_random_uuid(),
  card_number text not null,
  value numeric not null default 0,
  remaining_value numeric not null default 0,
  customer_id uuid references customers (id) on delete set null,
  status text not null default 'active' check (status in ('active', 'used', 'expired', 'disabled')),
  expires_at date,
  created_at timestamptz not null default now()
);
create unique index if not exists giftcards_number_idx on giftcards (card_number);
create index if not exists giftcards_status_idx on giftcards (status);

-- ── Expenses (gastos) ────────────────────────────────────────────
create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  expense_date date not null default current_date,
  category text not null default 'general',
  description text default '',
  amount numeric not null default 0,
  payment_method text default 'efectivo',
  supplier_id uuid references suppliers (id) on delete set null,
  reference text default '',
  created_at timestamptz not null default now()
);
create index if not exists expenses_date_idx on expenses (expense_date desc);
create index if not exists expenses_category_idx on expenses (category);

-- ── Audit triggers for new tables ────────────────────────────────
create or replace function audit_generic() returns trigger as $$
begin
  insert into audit_log (table_name, record_id, action, changed_by, old_data, new_data)
  values (
    tg_table_name,
    coalesce(new.id, old.id),
    tg_op,
    current_setting('app.user', true) or 'system',
    case when tg_op = 'INSERT' then null else to_jsonb(old) end,
    case when tg_op = 'DELETE' then null else to_jsonb(new) end
  );
  return coalesce(new, old);
end;
$$ language plpgsql;

drop trigger if exists stock_locations_audit_insert on stock_locations;
drop trigger if exists stock_locations_audit_update on stock_locations;
drop trigger if exists stock_locations_audit_delete on stock_locations;
create trigger stock_locations_audit_insert after insert on stock_locations
  for each row execute function audit_generic();
create trigger stock_locations_audit_update after update on stock_locations
  for each row execute function audit_generic();
create trigger stock_locations_audit_delete after delete on stock_locations
  for each row execute function audit_generic();

drop trigger if exists receivings_audit_insert on receivings;
drop trigger if exists receivings_audit_update on receivings;
drop trigger if exists receivings_audit_delete on receivings;
create trigger receivings_audit_insert after insert on receivings
  for each row execute function audit_generic();
create trigger receivings_audit_update after update on receivings
  for each row execute function audit_generic();
create trigger receivings_audit_delete after delete on receivings
  for each row execute function audit_generic();

drop trigger if exists item_kits_audit_insert on item_kits;
drop trigger if exists item_kits_audit_update on item_kits;
drop trigger if exists item_kits_audit_delete on item_kits;
create trigger item_kits_audit_insert after insert on item_kits
  for each row execute function audit_generic();
create trigger item_kits_audit_update after update on item_kits
  for each row execute function audit_generic();
create trigger item_kits_audit_delete after delete on item_kits
  for each row execute function audit_generic();

drop trigger if exists giftcards_audit_insert on giftcards;
drop trigger if exists giftcards_audit_update on giftcards;
drop trigger if exists giftcards_audit_delete on giftcards;
create trigger giftcards_audit_insert after insert on giftcards
  for each row execute function audit_generic();
create trigger giftcards_audit_update after update on giftcards
  for each row execute function audit_generic();
create trigger giftcards_audit_delete after delete on giftcards
  for each row execute function audit_generic();

drop trigger if exists expenses_audit_insert on expenses;
drop trigger if exists expenses_audit_update on expenses;
drop trigger if exists expenses_audit_delete on expenses;
create trigger expenses_audit_insert after insert on expenses
  for each row execute function audit_generic();
create trigger expenses_audit_update after update on expenses
  for each row execute function audit_generic();
create trigger expenses_audit_delete after delete on expenses
  for each row execute function audit_generic();

-- ── RLS policies ─────────────────────────────────────────────────
alter table stock_locations enable row level security;
alter table receivings enable row level security;
alter table receiving_items enable row level security;
alter table item_kits enable row level security;
alter table item_kit_items enable row level security;
alter table giftcards enable row level security;
alter table expenses enable row level security;

create policy "stock_locations_all" on stock_locations for all using (true) with check (true);
create policy "receivings_all" on receivings for all using (true) with check (true);
create policy "receiving_items_all" on receiving_items for all using (true) with check (true);
create policy "item_kits_all" on item_kits for all using (true) with check (true);
create policy "item_kit_items_all" on item_kit_items for all using (true) with check (true);
create policy "giftcards_all" on giftcards for all using (true) with check (true);
create policy "expenses_all" on expenses for all using (true) with check (true);

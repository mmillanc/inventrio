-- Core tables present in every plan.
create extension if not exists "pgcrypto";

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  plan text not null default 'laboratorio' check (plan in ('laboratorio', 'pyme')),
  store_name text not null default 'Inventrio',
  store_email text default '',
  store_phone text default '',
  store_address text default '',
  currency text not null default 'USD',
  tax_rate numeric not null default 0,
  expiration_alert_days integer not null default 30,
  admin_user text not null default 'admin',
  admin_password text not null default 'inventrio',
  created_at timestamptz not null default now()
);

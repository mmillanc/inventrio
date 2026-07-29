-- Customers module (plan Pyme).
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text default '',
  phone text default '',
  tax_id text default '',
  address text default '',
  notes text default '',
  created_at timestamptz not null default now()
);

alter table sales
  add constraint sales_customer_id_fkey
  foreign key (customer_id) references customers (id) on delete set null;

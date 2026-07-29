-- Suppliers module (Laboratorio + Pyme).
create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text default '',
  email text default '',
  phone text default '',
  tax_id text default '',
  address text default '',
  notes text default '',
  created_at timestamptz not null default now()
);

create index if not exists suppliers_name_idx on suppliers (name);

alter table items
  add constraint items_supplier_id_fkey
  foreign key (supplier_id) references suppliers (id) on delete set null;

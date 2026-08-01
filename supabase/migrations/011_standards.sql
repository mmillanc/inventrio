-- Standards: normas y estándares de calidad para control riguroso del inventario.
create table if not exists standards (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  description text default '',
  standard_type text not null default 'ISO',
  standard_class text not null default 'primary' check (standard_class in ('primary', 'secondary', 'working', 'reference', 'certified')),
  brand text default '',
  version text default '',
  issuing_body text default '',
  certification_body text default '',
  issue_date date,
  expiry_date date,
  status text not null default 'active' check (status in ('active', 'expired', 'pending', 'revoked')),
  scope text default '',
  storage_condition text not null default 'ambient' check (storage_condition in ('ambient', 'cold', 'freezer', 'ultra_freezer', 'nitrogen', 'dark', 'dry')),
  weight_received numeric(12,4) default 0,
  weight_unit text default 'mg',
  linked_item_id uuid references items (id) on delete set null,
  certificate_url text default '',
  certificate_filename text default '',
  certificate_uploaded_at timestamptz,
  review_frequency_days integer default 365,
  last_reviewed_at date,
  next_review_at date,
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists standards_code_idx on standards (code);
create index if not exists standards_status_idx on standards (status);
create index if not exists standards_expiry_idx on standards (expiry_date);
create index if not exists standards_linked_item_idx on standards (linked_item_id);

-- Audit trigger for standards (same pattern as other tables).
create or replace function audit_standards() returns trigger as $$
begin
  insert into audit_log (table_name, record_id, action, changed_by, old_data, new_data)
  values (
    'standards',
    coalesce(new.id, old.id),
    tg_op,
    current_setting('app.user', true) or 'system',
    case when tg_op = 'INSERT' then null else to_jsonb(old) end,
    case when tg_op = 'DELETE' then null else to_jsonb(new) end
  );
  return coalesce(new, old);
end;
$$ language plpgsql;

drop trigger if exists standards_audit_insert on standards;
drop trigger if exists standards_audit_update on standards;
drop trigger if exists standards_audit_delete on standards;

create trigger standards_audit_insert after insert on standards
  for each row execute function audit_standards();
create trigger standards_audit_update after update on standards
  for each row execute function audit_standards();
create trigger standards_audit_delete after delete on standards
  for each row execute function audit_standards();

-- RLS policies for standards.
alter table standards enable row level security;

create policy "Standards are visible to all authenticated users"
  on standards for select using (true);

create policy "Standards can be managed by all authenticated users"
  on standards for all using (true) with check (true);

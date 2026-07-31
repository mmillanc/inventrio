-- Operators (lab workers who can withdraw items from inventory).
create table if not exists operators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  department text default '',
  email text default '',
  phone text default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists operators_name_idx on operators (name);

-- Add operator_id to stock_movements to track who made each movement.
alter table stock_movements add column if not exists operator_id uuid references operators (id) on delete set null;
create index if not exists stock_movements_operator_idx on stock_movements (operator_id);

-- Audit log: records every INSERT/UPDATE/DELETE on key tables.
create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id uuid not null,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  changed_by text default 'system',
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_table_idx on audit_log (table_name);
create index if not exists audit_log_record_idx on audit_log (record_id);
create index if not exists audit_log_date_idx on audit_log (created_at desc);

-- Generic audit trigger function: logs the operation to audit_log.
create or replace function audit_trigger_fn() returns trigger as $$
begin
  if TG_OP = 'DELETE' then
    insert into audit_log (table_name, record_id, action, old_data, changed_by)
    values (TG_TABLE_NAME, OLD.id, 'DELETE', to_jsonb(OLD), current_setting('app.user', true));
    return OLD;
  elsif TG_OP = 'UPDATE' then
    insert into audit_log (table_name, record_id, action, old_data, new_data, changed_by)
    values (TG_TABLE_NAME, NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), current_setting('app.user', true));
    return NEW;
  elsif TG_OP = 'INSERT' then
    insert into audit_log (table_name, record_id, action, new_data, changed_by)
    values (TG_TABLE_NAME, NEW.id, 'INSERT', to_jsonb(NEW), current_setting('app.user', true));
    return NEW;
  end if;
  return null;
end;
$$ language plpgsql;

-- Attach the trigger to key tables.
drop trigger if exists items_audit on items;
create trigger items_audit after insert or update or delete on items
  for each row execute function audit_trigger_fn();

drop trigger if exists stock_movements_audit on stock_movements;
create trigger stock_movements_audit after insert or update or delete on stock_movements
  for each row execute function audit_trigger_fn();

drop trigger if exists lots_audit on lots;
create trigger lots_audit after insert or update or delete on lots
  for each row execute function audit_trigger_fn();

drop trigger if exists suppliers_audit on suppliers;
create trigger suppliers_audit after insert or update or delete on suppliers
  for each row execute function audit_trigger_fn();

drop trigger if exists operators_audit on operators;
create trigger operators_audit after insert or update or delete on operators
  for each row execute function audit_trigger_fn();

-- RLS on new tables.
alter table operators enable row level security;
alter table audit_log enable row level security;

create policy "operators_service_only" on operators for all using (false) with check (false);
create policy "audit_log_service_only" on audit_log for all using (false) with check (false);

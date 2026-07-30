-- Row Level Security: allow all operations via service role key.
-- The app uses the service role key server-side, which bypasses RLS.
-- This prevents direct access from the browser using the anon key.

alter table settings enable row level security;
alter table items enable row level security;
alter table stock_movements enable row level security;
alter table suppliers enable row level security;
alter table lots enable row level security;

-- Deny all access to anonymous/authenticated users.
-- Only the service role (used server-side) can read/write.
create policy "settings_service_only" on settings for all using (false) with check (false);
create policy "items_service_only" on items for all using (false) with check (false);
create policy "stock_movements_service_only" on stock_movements for all using (false) with check (false);
create policy "suppliers_service_only" on suppliers for all using (false) with check (false);
create policy "lots_service_only" on lots for all using (false) with check (false);

-- Add laboratory-specific columns to items table.
-- Safe to run on an existing table (IF NOT EXISTS).

alter table items add column if not exists cas_number text default '';
alter table items add column if not exists chemical_formula text default '';
alter table items add column if not exists storage_condition text default '';

-- Reports module: aggregate views used by the dashboard and the report builder.
create or replace view report_stock_by_category as
select category as label, sum(quantity) as value
from items
group by category
order by value desc;

create or replace view report_inventory_value as
select category as label, sum(quantity * unit_cost) as value
from items
group by category
order by value desc;

create or replace view report_low_stock as
select name as label, quantity as value, min_stock
from items
where quantity <= min_stock
order by quantity asc;

create or replace view report_movements as
select
  case type when 'in' then 'entradas' when 'out' then 'salidas' else 'ajustes' end as label,
  sum(quantity) as value
from stock_movements
where moved_at >= current_date - interval '30 days'
group by 1;

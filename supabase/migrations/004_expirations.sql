-- Expirations module (plan Laboratorio). Derived from lots, no extra table.
create or replace view lot_expirations as
select
  l.id,
  l.code,
  l.item_id,
  i.name as item_name,
  l.quantity,
  l.expires_at,
  (l.expires_at - current_date) as days_left,
  case
    when l.expires_at < current_date then 'vencido'
    when l.expires_at <= current_date + interval '30 days' then 'por vencer'
    else 'vigente'
  end as state
from lots l
join items i on i.id = l.item_id;

-- Demo data for the Laboratorio plan (mirrors src/lib/db/seed.ts used in local mode).
insert into settings (plan, store_name, store_email, store_phone, store_address, currency, tax_rate, expiration_alert_days)
values ('laboratorio', 'Laboratorio Inventrio', 'contacto@inventrio.test', '+34 600 000 000', 'Av. Central 123', 'USD', 21, 30);

insert into suppliers (id, name, contact_name, email, phone, tax_id, address, notes) values
  ('11111111-1111-1111-1111-111111111111', 'Química Andina', 'Laura Pérez', 'ventas@quimicaandina.test', '+34 611 111 111', 'B12345678', 'Polígono Sur, Nave 4', 'Reactivos y solventes.'),
  ('22222222-2222-2222-2222-222222222222', 'MedLab Supplies', 'Carlos Ruiz', 'info@medlab.test', '+34 622 222 222', 'B87654321', 'Calle Industria 88', 'Consumibles y material estéril.');

insert into items (id, sku, name, category, unit, quantity, min_stock, unit_cost, location, supplier_id, notes) values
  ('aaaaaaa1-0000-0000-0000-000000000001', 'RX-001', 'Etanol absoluto 99.8%', 'reactivos', 'litro', 24, 10, 18.50, 'Estante A1', '11111111-1111-1111-1111-111111111111', 'Inflamable.'),
  ('aaaaaaa1-0000-0000-0000-000000000002', 'RX-002', 'Ácido clorhídrico 37%', 'reactivos', 'litro', 6, 8, 22.90, 'Estante A2', '11111111-1111-1111-1111-111111111111', 'Corrosivo.'),
  ('aaaaaaa1-0000-0000-0000-000000000003', 'CS-010', 'Guantes de nitrilo talla M', 'consumibles', 'caja', 45, 20, 9.40, 'Almacén B', '22222222-2222-2222-2222-222222222222', ''),
  ('aaaaaaa1-0000-0000-0000-000000000004', 'CS-011', 'Tubos de ensayo 15 ml', 'vidrieria', 'unidad', 320, 100, 0.75, 'Almacén B', '22222222-2222-2222-2222-222222222222', ''),
  ('aaaaaaa1-0000-0000-0000-000000000005', 'MD-100', 'Kit de reactivo glucosa', 'medicamentos', 'caja', 12, 5, 64.00, 'Refrigerador 1', '22222222-2222-2222-2222-222222222222', 'Conservar entre 2 y 8 °C.');

insert into lots (id, code, item_id, supplier_id, quantity, manufactured_at, expires_at, status, notes) values
  ('bbbbbbb1-0000-0000-0000-000000000001', 'L-2401', 'aaaaaaa1-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 12, current_date - 200, current_date + 120, 'activo', ''),
  ('bbbbbbb1-0000-0000-0000-000000000002', 'L-2402', 'aaaaaaa1-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 6, current_date - 160, current_date + 18, 'activo', 'Revisar antes de usar.'),
  ('bbbbbbb1-0000-0000-0000-000000000003', 'L-2403', 'aaaaaaa1-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 12, current_date - 90, current_date - 5, 'activo', 'Lote vencido, retirar.'),
  ('bbbbbbb1-0000-0000-0000-000000000004', 'L-2404', 'aaaaaaa1-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 45, current_date - 30, current_date + 400, 'activo', '');

insert into stock_movements (item_id, lot_id, type, quantity, reason, moved_at) values
  ('aaaaaaa1-0000-0000-0000-000000000001', 'bbbbbbb1-0000-0000-0000-000000000001', 'in', 12, 'Compra inicial', current_date - 80),
  ('aaaaaaa1-0000-0000-0000-000000000002', 'bbbbbbb1-0000-0000-0000-000000000002', 'in', 10, 'Compra inicial', current_date - 78),
  ('aaaaaaa1-0000-0000-0000-000000000002', 'bbbbbbb1-0000-0000-0000-000000000002', 'out', 4, 'Consumo ensayo QC-12', current_date - 12),
  ('aaaaaaa1-0000-0000-0000-000000000003', 'bbbbbbb1-0000-0000-0000-000000000004', 'in', 45, 'Reposición mensual', current_date - 30);

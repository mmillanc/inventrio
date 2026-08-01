"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Search, Trash2, Plus, Minus } from "lucide-react";
import CrudView from "@/modules/_core/components/CrudView";
import ModuleLayout from "@/modules/_core/components/ModuleLayout";
import StatCard from "@/modules/_core/components/StatCard";
import Tabs from "@/modules/_core/components/Tabs";
import { useSettings } from "@/modules/_core/hooks/useSettings";
import { useCrud } from "@/modules/_core/hooks/useCrud";
import salesConfig from "../config";
import type { Sale } from "../types";
import type { Item } from "@/modules/inventory/types";
import type { Customer } from "@/modules/customers/types";

interface CartItem {
  item_id: string;
  name: string;
  unit_price: number;
  quantity: number;
  discount: number;
}

function PosRegister() {
  const { currency } = useSettings();
  const { rows: items } = useCrud<Item>("items");
  const { create: createSale } = useCrud<Sale>("sales");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [saleMode, setSaleMode] = useState("sale");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [customerId, setCustomerId] = useState("");
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const { rows: customers } = useCrud<Customer>("customers");

  const filteredItems = useMemo(() => {
    if (!search) return items.slice(0, 20);
    const q = search.toLowerCase();
    return items.filter((i) => i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q)).slice(0, 20);
  }, [items, search]);

  const addToCart = (item: Item) => {
    const existing = cart.find((c) => c.item_id === item.id);
    if (existing) {
      setCart(cart.map((c) => (c.item_id === item.id ? { ...c, quantity: c.quantity + 1 } : c)));
    } else {
      setCart([...cart, { item_id: item.id, name: item.name, unit_price: item.unit_cost, quantity: 1, discount: 0 }]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map((c) => (c.item_id === id ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c)));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c.item_id !== id));
  };

  const subtotal = cart.reduce((sum, c) => sum + c.unit_price * c.quantity, 0);
  const total = Math.max(0, subtotal - globalDiscount);

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    cart.forEach((c) => {
      createSale({
        sold_at: new Date().toISOString().split("T")[0],
        customer_id: customerId || null,
        item_id: c.item_id,
        quantity: c.quantity,
        unit_price: c.unit_price,
        payment_method: paymentMethod,
        sale_mode: saleMode,
        status: "completed",
        subtotal: c.unit_price * c.quantity,
        discount: c.discount,
        tax_amount: 0,
        total: c.unit_price * c.quantity - c.discount,
        reference: "",
        notes: "",
      });
    });
    setCart([]);
    setGlobalDiscount(0);
  };

  const handleSuspend = () => {
    if (cart.length === 0) return;
    cart.forEach((c) => {
      createSale({
        sold_at: new Date().toISOString().split("T")[0],
        customer_id: customerId || null,
        item_id: c.item_id,
        quantity: c.quantity,
        unit_price: c.unit_price,
        payment_method: paymentMethod,
        sale_mode: saleMode,
        status: "suspended",
        subtotal: c.unit_price * c.quantity,
        discount: c.discount,
        tax_amount: 0,
        total: c.unit_price * c.quantity - c.discount,
        reference: "",
        notes: "",
      });
    });
    setCart([]);
  };

  const handleCancel = () => {
    if (confirm("¿Seguro que desea cancelar esta venta? Todos los artículos serán eliminados.")) {
      setCart([]);
      setGlobalDiscount(0);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Item search + list */}
      <div className="lg:col-span-2 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-teal-500 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal-500"
            >
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.sku}</p>
              <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">
                {currency}{item.unit_cost.toFixed(2)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="space-y-3">
        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-slate-100 p-3 dark:border-slate-700">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <ShoppingCart className="size-4" />
              Carrito ({cart.length})
            </h3>
          </div>
          <div className="max-h-64 overflow-y-auto p-3">
            {cart.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">No hay artículos en el carrito.</p>
            ) : (
              <div className="space-y-2">
                {cart.map((c) => (
                  <div key={c.item_id} className="flex items-center gap-2 text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{c.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{currency}{c.unit_price.toFixed(2)} c/u</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(c.item_id, -1)} className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center text-slate-900 dark:text-slate-100">{c.quantity}</span>
                      <button onClick={() => updateQty(c.item_id, 1)} className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <span className="w-16 text-right font-medium text-slate-900 dark:text-slate-100">
                      {currency}{(c.unit_price * c.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeFromCart(c.item_id)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sale controls */}
        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Cliente (opcional)</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={saleMode}
              onChange={(e) => setSaleMode(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="sale">Venta</option>
              <option value="quote">Cotización</option>
              <option value="work_order">Orden trabajo</option>
              <option value="invoice">Factura</option>
              <option value="return">Devolución</option>
            </select>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
              <option value="giftcard">Tarjeta de Regalo</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 dark:text-slate-400">Descuento:</label>
            <input
              type="number"
              step="0.01"
              value={globalDiscount}
              onChange={(e) => setGlobalDiscount(parseFloat(e.target.value) || 0)}
              className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="border-t border-slate-100 pt-2 dark:border-slate-700">
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Descuento</span>
              <span>-{currency}{globalDiscount.toFixed(2)}</span>
            </div>
            <div className="mt-1 flex justify-between text-lg font-bold text-slate-900 dark:text-slate-100">
              <span>Total</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handleCompleteSale}
              disabled={cart.length === 0}
              className="rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
            >
              Completar
            </button>
            <button
              onClick={handleSuspend}
              disabled={cart.length === 0}
              className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
            >
              Suspendida
            </button>
            <button
              onClick={handleCancel}
              disabled={cart.length === 0}
              className="col-span-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesHistory() {
  const { currency } = useSettings();

  const header = (allRows: Sale[]) => {
    const completed = allRows.filter((r) => r.status === "completed").length;
    const suspended = allRows.filter((r) => r.status === "suspended").length;
    const cancelled = allRows.filter((r) => r.status === "cancelled").length;
    const totalRevenue = allRows.filter((r) => r.status === "completed").reduce((sum, r) => sum + (r.total || r.unit_price * r.quantity), 0);

    return (
      <div className="grid gap-3 sm:grid-cols-4">
        <StatCard label="Completadas" value={completed} hint="Ventas finalizadas" tone="success" />
        <StatCard label="Suspendidas" value={suspended} hint="Pendientes de completar" tone="warning" />
        <StatCard label="Canceladas" value={cancelled} hint="Ventas anuladas" tone="danger" />
        <StatCard label="Ingresos" value={`${currency}${totalRevenue.toFixed(2)}`} hint="Total completado" />
      </div>
    );
  };

  return <CrudView<Sale> config={salesConfig} newLabel="Nueva venta" currency={currency} header={header} />;
}

export function SalesView() {
  const tabs = [
    { id: "pos", label: "POS", content: <PosRegister /> },
    { id: "history", label: "Historial", content: <SalesHistory /> },
  ];

  return (
    <ModuleLayout title="Ventas" description="Punto de venta e historial de ventas.">
      <Tabs items={tabs} />
    </ModuleLayout>
  );
}

export default SalesView;

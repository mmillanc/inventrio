import {
  BarChart3,
  Clock,
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  Truck,
  Users,
  BadgeCheck,
  Gift,
  Receipt,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  package: Package,
  truck: Truck,
  tags: Tags,
  clock: Clock,
  "bar-chart": BarChart3,
  settings: Settings,
  users: Users,
  "shopping-cart": ShoppingCart,
  dashboard: LayoutDashboard,
  "badge-check": BadgeCheck,
  "map-pin": MapPin,
  gift: Gift,
  receipt: Receipt,
};

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? LayoutDashboard;
  return <Icon className={className} />;
}

export default ModuleIcon;

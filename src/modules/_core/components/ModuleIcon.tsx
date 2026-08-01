import {
  BarChart3,
  Clock,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  Truck,
  Users,
  BadgeCheck,
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
};

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? LayoutDashboard;
  return <Icon className={className} />;
}

export default ModuleIcon;

import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Wallet,
  Building2,
  MapPin,
  BookOpen,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

export const navigationIcons: Record<string, LucideIcon> = {
  "/": LayoutDashboard,
  "/students": Users,
  "/attendance": ClipboardCheck,
  "/fees": Wallet,
  "/hostel": Building2,
  "/turf": MapPin,
  "/accounts": BookOpen,
  "/reports": BarChart3,
  "/settings": Settings,
};

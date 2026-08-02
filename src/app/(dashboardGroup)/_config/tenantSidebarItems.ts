import { ISidebarItem } from "@/lib/types";
import { ClipboardList, CreditCard, FileText, LayoutDashboard, Star, User } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/tenant-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Requests",
    href: "/tenant-dashboard/requests",
    icon: ClipboardList,
  },
  {
    label: "My Payments",
    href: "/tenant-dashboard/payments",
    icon: CreditCard,
  },
  {
    label: "My Reviews",
    href: "/tenant-dashboard/reviews",
    icon: Star,
  },
  {
    label: "Profile",
    href: "/tenant-dashboard/profile",
    icon: User,
  },
];
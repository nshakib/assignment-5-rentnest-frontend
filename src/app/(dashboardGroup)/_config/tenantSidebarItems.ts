// src/app/(dashboardGroup)/_config/tenantSidebarItems.ts
import { ISidebarItem } from "@/lib/types";
import {
  LayoutDashboard,
  FileSignature,
  CreditCard,
  User,
  Star,
} from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/tenant-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Requests",
    href: "/tenant-dashboard/requests",
    icon: FileSignature,
    
  },
  {
    label: "Payments",
    href: "/tenant-dashboard/payments",
    icon: CreditCard,
    
  },
  {
    label: "Reviews",
    href: "/tenant-dashboard/reviews",
    icon: Star,
    
  },
  {
    label: "Profile",
    href: "/tenant-dashboard/profile",
    icon: User,

  },
];
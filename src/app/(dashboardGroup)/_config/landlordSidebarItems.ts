import { ISidebarItem } from "@/lib/types";
import {
  LayoutDashboard,
  Building2,
  Inbox,
} from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Overview",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    href: "/landlord-dashboard/properties",
    icon: Building2,
  },
  {
    label: "Requests",
    href: "/landlord-dashboard/requests",
    icon: Inbox,
  },
];
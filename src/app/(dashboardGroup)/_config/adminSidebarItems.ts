import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label : "Overview",
        href : "/admin-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "User Management",
        href : "/admin-dashboard/user",
        icon : FileText
    },
    {
        label : "Property Management",
        href : "/admin-dashboard/properties",
        icon : FileText
    },
    {
        label : "Rental Requests",
        href : "/admin-dashboard/requests",
        icon : FileText
    },

]
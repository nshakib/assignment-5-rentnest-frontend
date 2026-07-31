import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Tenant Dashboard",
        href : "/tenant-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "My Requests",
        href : "/tenant-dashboard/requests",
        icon : FileText
    },
    {
        label : "Payments",
        href : "/tenant-dashboard/payments",
        icon : FileText
    },
    {
        label : "My Reviews",
        href : "/tenant-dashboard/reviews",
        icon : FileText
    },
    {
        label : "Profile",
        href : "/tenant-dashboard/profile",
        icon : FileText
    },
]
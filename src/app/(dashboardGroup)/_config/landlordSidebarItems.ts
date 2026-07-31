import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Overview",
        href : "/landlord-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "My Properties",
        href : "/landlord-dashboard/properties",
        icon : FileText
    },
    {
        label : "Requests",
        href : "/landlord-dashboard/requests",
        icon : FileTextgit
    },
]
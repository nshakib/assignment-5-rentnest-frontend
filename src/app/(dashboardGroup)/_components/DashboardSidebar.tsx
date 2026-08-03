"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { DashboardUserProps, ISidebarItem } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

export default function DashboardSidebar({user} : DashboardUserProps) {
  const pathname = usePathname();

  let navItems : ISidebarItem[]  = [];

  if(user.data.role === "TENANT"){
    navItems=sidebarMenuItems.TENANT
  }else if (user.data.role === "LANDLORD") {
     navItems = sidebarMenuItems.LANDLORD;
  }else if (user.data.role === "ADMIN") {
     navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="none"
      className=" h-[calc(100svh-0rem)] border-r border-sidebar-border"
    >

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
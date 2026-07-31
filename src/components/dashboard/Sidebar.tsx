"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings, School, LogOut } from "lucide-react";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import { sidebarMenuItems } from "@/app/(dashboardGroup)/_config/sidebarMenuItems";

export const Sidebar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  let navItems: ISidebarItem[] = [];

  if (user.data.role === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  } else if (user.data.role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (user.data.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }
  
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300 border-r border-slate-800">
      {/* Logo Section */}
      <div className="px-6 py-8 flex items-center">
        <Link href="/admin" className="flex items-center gap-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
            <School className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            School<span className="text-indigo-400">Pro</span>
          </h1>
        </Link>
      </div>

      {/* Navigation Routes */}
      <div className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 ease-in-out",
                isActive
                  ? "bg-indigo-600/10 text-indigo-400 border-r-4 border-indigo-500"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              )}
            >
              <route.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {route.label}
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 mt-auto border-t border-slate-800/50 space-y-1">
        <Link
          href="/settings"
          className="group flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all"
        >
          <Settings className="h-5 w-5 text-slate-500 group-hover:text-slate-300" />
          Settings
        </Link>

        <button
          className="w-full group flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};
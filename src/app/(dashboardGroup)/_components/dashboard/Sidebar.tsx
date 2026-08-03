"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Settings, School, LogOut, X, ChevronRight } from "lucide-react";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import { sidebarMenuItems } from "@/app/(dashboardGroup)/_config/sidebarMenuItems";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { logoutAction } from "@/app/(publicGroup)/_actions/logoutActions";
import { useSidebarStore } from "@/store/sidebarStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";


export const Sidebar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, setOpen } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const navItems: ISidebarItem[] = (() => {
    switch (user.data.role) {
      case "TENANT": return sidebarMenuItems.TENANT;
      case "LANDLORD": return sidebarMenuItems.LANDLORD;
      case "ADMIN": return sidebarMenuItems.ADMIN;
      default: return [];
    }
  })();

  const handleLogout = async () => {
    try {
      await logoutAction();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      router.refresh();
    }
  };

  if (!mounted || !user?.data) return null;

  const userName = user.data.name || "User";
  const userRole = user.data.role || "";
  const userInitial = userName.charAt(0).toUpperCase();

  // Role badge colors matching Navbar
  const roleColors: Record<string, string> = {
    ADMIN: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    LANDLORD: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    TENANT: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300 selection:bg-indigo-500/30">
      {/* ─── Logo Section ─── */}
      <div className="px-5 py-6 flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="flex items-center gap-x-3 group"
          onClick={() => setOpen(false)}
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/25 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
            <School className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
              Rent<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Nest</span>
            </h1>
            <span className="text-[9px] font-medium uppercase tracking-widest text-slate-500 mt-0.5">
              Marketplace
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all duration-200"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ─── User Mini Profile (Desktop only) ─── */}
      <div className="hidden lg:flex mx-4 mb-4 items-center gap-3 rounded-xl bg-slate-900/50 border border-slate-800/50 px-3 py-3">
        <Avatar className="h-9 w-9 ring-2 ring-indigo-500/20">
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-xs font-bold">
            {userInitial}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white truncate">{userName}</p>
          <Badge
            variant="outline"
            className={`mt-0.5 text-[9px] px-1.5 py-0 font-medium border ${roleColors[userRole] || "bg-slate-800 text-slate-400 border-slate-700"}`}
          >
            {userRole}
          </Badge>
        </div>
      </div>

      <Separator className="bg-slate-800/50 mx-4" />

      {/* ─── Navigation Routes ─── */}
      <ScrollArea className="flex-1 px-3 py-3">
        <nav className="space-y-0.5" aria-label="Dashboard navigation">
          {navItems.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(route.href + "/");
            return (
              <Tooltip key={route.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={route.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-x-3 text-[13px] font-medium px-3 py-2.5 rounded-xl transition-all duration-200 ease-out",
                      isActive
                        ? "bg-indigo-600/15 text-indigo-300 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.15)]"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                    )}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    )}

                    <route.icon
                      className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                        isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                      )}
                    />
                    <span className="flex-1">{route.label}</span>

                    {/* Subtle chevron for active state */}
                    {isActive && (
                      <ChevronRight className="h-3.5 w-3.5 text-indigo-400/60 animate-in fade-in slide-in-from-left-1 duration-300" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  {route.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </ScrollArea>

      {/* ─── Bottom Actions ─── */}
      <div className="shrink-0 p-3 space-y-0.5 border-t border-slate-800/50">
        <Link
          href="/settings"
          className="group flex items-center gap-x-3 text-[13px] font-medium px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-all duration-200"
        >
          <Settings className="h-[18px] w-[18px] text-slate-500 group-hover:text-slate-300 transition-colors" />
          <span>Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full group flex items-center gap-x-3 text-[13px] font-medium px-3 py-2.5 rounded-xl text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
          type="button"
        >
          <LogOut className="h-[18px] w-[18px] transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: Fixed aside with subtle gradient border */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-30 border-r border-slate-800/80 bg-[#0f172a]">
        {sidebarContent}
      </aside>

      {/* Mobile: Sheet overlay */}
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-72 p-0 bg-[#0f172a] border-slate-800/80 shadow-2xl shadow-black/50"
        >
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
};
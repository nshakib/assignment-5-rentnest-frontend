"use client";

import { useEffect, useState } from "react";
import { Bell, LogOut, Menu, User, Settings, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavbarProps } from "@/lib/types";
import { logoutAction } from "@/app/(publicGroup)/_actions/logoutActions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarStore } from "@/store/sidebarStore";

export const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();
  const { toggle } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const userName = user?.data?.name || "User";
  const userEmail = user?.data?.email || "";
  const userRole = user?.data?.role || "";
  const userInitial = userName.charAt(0).toUpperCase();

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

  if (!user?.data) return null;

  // Role badge color mapping
  const roleColors: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    LANDLORD: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    TENANT: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ─── Left Section ─── */}
        <div className="flex items-center gap-3">
          {/* Hamburger with hover animation */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden shrink-0 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                onClick={toggle}
                aria-label="Toggle sidebar"
              >
                <Menu size={22} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="lg:hidden">Menu</TooltipContent>
          </Tooltip>

          {/* Logo with gradient accent */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-bold shadow-lg shadow-indigo-500/25 ring-2 ring-white dark:ring-slate-900">
              {userInitial}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-white dark:border-slate-900" />
              </span>
            </div>
            <div className="hidden sm:block">
              <Link
                href="/"
                className="group text-xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                Rent<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300">Nest</span>
              </Link>
              <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Property Marketplace
              </p>
            </div>
          </div>
        </div>

        {/* ─── Right Section ─── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification bell with count badge + pulse
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                  3
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip> */}

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-gray-200 dark:bg-gray-800 mx-1" />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-3 rounded-2xl pl-1.5 pr-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                aria-label="User menu"
              >
                <Avatar className="h-9 w-9 ring-2 ring-white dark:ring-slate-900 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-sm font-bold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden xl:block text-left min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-none truncate max-w-[120px]">
                    {userName}
                  </p>
                  <Badge
                    variant="outline"
                    className={`mt-1 text-[9px] px-1.5 py-0 font-medium border ${roleColors[userRole] || "bg-gray-100 text-gray-600 border-gray-200"}`}
                  >
                    {userRole}
                  </Badge>
                </div>
                <ChevronDown
                  size={14}
                  className="text-gray-400 hidden xl:block transition-transform duration-200 data-[state=open]:rotate-180"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 mt-2 rounded-2xl shadow-2xl border-gray-200 dark:border-gray-800 p-1">
              {/* Header with avatar */}
              <div className="flex items-center gap-3 px-3 py-3 mb-1">
                <Avatar className="h-10 w-10 ring-2 ring-indigo-100 dark:ring-indigo-900">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-sm font-bold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
                </div>
              </div>

              <DropdownMenuSeparator className="dark:bg-gray-800" />

              <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5 px-3 my-0.5">
                <Link href="/profile" className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30 mr-3">
                    <User size={16} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Profile</span>
                    <span className="text-[11px] text-gray-400">View & edit your info</span>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5 px-3 my-0.5">
                <Link href="/settings" className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900/50 mr-3">
                    <Settings size={16} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Settings</span>
                    <span className="text-[11px] text-gray-400">Preferences & security</span>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="dark:bg-gray-800" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-xl cursor-pointer py-2.5 px-3 my-0.5 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/30 mr-3">
                  <LogOut size={16} className="text-red-600 dark:text-red-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Sign Out</span>
                  <span className="text-[11px] text-red-400">End your session</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
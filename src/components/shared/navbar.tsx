"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NavbarProps } from "@/lib/types";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const DASHBOARD_PATH: Record<string, string> = {
  TENANT: "/tenant-dashboard",
  LANDLORD: "/landlord-dashboard",
  ADMIN: "/admin-dashboard",
};

export function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isLoggedIn = Boolean(user?.success && user?.data);
  const role = user?.data?.role;
  const dashboardPath = role ? DASHBOARD_PATH[role] ?? "/" : "/";

  function handleLogout() {
    startTransition(async () => {
      // await logoutAction();
      router.push("/");
      router.refresh();
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          RentNest
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {role === "LANDLORD" && (
                <Link
                  href="/landlord-dashboard/properties/new"
                  className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Add Property
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {user?.data?.name?.charAt(0).toUpperCase() ?? "?"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.data?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.data?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardPath} className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} disabled={isPending} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> {isPending ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-foreground">
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  {role === "LANDLORD" && (
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link href="/landlord-dashboard/properties/new">Add Property</Link>
                    </Button>
                  )}
                  <Button asChild variant="outline" onClick={() => setOpen(false)}>
                    <Link href={dashboardPath}>Dashboard</Link>
                  </Button>
                  <Button variant="destructive" onClick={handleLogout} disabled={isPending}>
                    {isPending ? "Logging out..." : "Logout"}
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" onClick={() => setOpen(false)}>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link href="/auth/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
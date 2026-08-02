// /* eslint-disable react-hooks/set-state-in-effect */

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Bell,
//   LogOut,
//   Menu,
//   X,
//   User,
//   Settings,
//   ChevronDown,
//   Sun,
//   Moon,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useTheme } from "next-themes"; 
// import { NavbarProps } from "@/lib/types";

// export const Navbar = ({ user }: NavbarProps) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const router = useRouter();


//   useEffect(() => setMounted(true), []);

//   const onLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/login");
//     router.refresh();
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-all duration-300">
//       <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md">
//             {user.data.name.charAt(0).toUpperCase()}
//           </div>
//           <div>
//             <Link
//               href="/"
//               className="text-lg sm:text-xl font-bold tracking-tight text-gray-800 dark:text-white"
//             >
//               RentNest
//             </Link>
//             <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
//               Rental Property Marketplace
//             </p>
//           </div>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center gap-6">
          
//           {mounted && (
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
//             >
//               {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//           )}

//           {/* Notification */}
//           <button className="relative rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
//             <Bell size={20} className="text-gray-600 dark:text-gray-300" />
//             <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
//           </button>

//           {/* User Profile */}
//           <div className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
//             <div className="text-right leading-tight">
//               <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                 {user.data.name}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">{user.data.email}</p>
//             </div>
//             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
//               S
//             </div>
//             <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
//           </div>
//         </div>

//         {/* Mobile & Tablet Buttons */}
//         <div className="flex items-center gap-2 lg:hidden">
//             {mounted && (
//                 <button
//                 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                 className="p-2 rounded-xl text-gray-600 dark:text-gray-300"
//                 >
//                 {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//                 </button>
//             )}
//             <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="flex items-center justify-center rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-300 ${
//           isMobileMenuOpen ? "max-h-100 border-t border-gray-200 dark:border-gray-800" : "max-h-0"
//         }`}
//       >
//         <div className="space-y-4 bg-white dark:bg-slate-950 px-5 py-5 shadow-lg">
//           <div className="flex flex-col gap-2">
//             <Link href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
//               <User size={18} /> Profile
//             </Link>
//             <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
//               <Settings size={18} /> Settings
//             </Link>
//             <button className="w-full flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all" onClick={onLogout}>
//               <LogOut className="h-5 w-5" /> Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };


"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import {
  Bell,
  LogOut,
  Menu,
  X,
  User,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { NavbarProps } from "@/lib/types";
import { logoutAction } from "@/app/(publicGroup)/_actions/logoutActions";

export const Navbar = ({ user }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle mounting for theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 function handleLogout() {
     startTransition(async () => {
       await logoutAction();
       router.push("/");
       router.refresh();
     });
   }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Safe access to user data
  const userName = user?.data?.name || "User";
  const userEmail = user?.data?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20">
            {userInitial}
          </div>
          <div className="hidden sm:block">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              RentNest
            </Link>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              A rental property marketplace
            </p>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-full p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* Notifications */}
          <button className="relative rounded-full p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-all">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-md">
                {userInitial}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.data.role}</p>
              </div>
              <ChevronDown 
                size={16} 
                className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-xl ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
                </div>
                <div className="p-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 px-4 py-6 shadow-inner">
          
          {/* Mobile User Info */}
          <div className="mb-6 flex items-center gap-4 rounded-xl bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {userInitial}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</p>
            </div>
          </div>

          {/* Mobile Links */}
          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={20} /> Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings size={20} /> Settings
            </Link>
            
            <div className="my-4 h-px bg-gray-200 dark:bg-gray-800" />
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
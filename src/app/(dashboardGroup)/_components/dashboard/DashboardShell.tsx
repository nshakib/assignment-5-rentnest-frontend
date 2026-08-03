// src/app/(dashboardGroup)/_components/dashboard/DashboardShell.tsx
import { getMe } from "@/service/getMe";
import { Sidebar } from "./Sidebar";       // ← YOUR custom Zustand sidebar
import { Navbar } from "./Navbar";         // ← YOUR custom navbar

export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = await getMe();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Custom sidebar: fixed on desktop, Sheet on mobile via Zustand */}
      <Sidebar user={user} />

      {/* Content area: offset by sidebar width on desktop ONLY */}
      <div className="flex flex-1 flex-col min-w-0 lg:ml-72 transition-[margin] duration-300 ease-in-out">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
import { getMe } from "@/service/getMe";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "../DashboardSidebar";
import { Navbar } from "./Navbar";

export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = await getMe(); // cookies() read now happens INSIDE this Suspense boundary

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <SidebarProvider>
        <div className="flex flex-1">
          <DashboardSidebar user={user} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
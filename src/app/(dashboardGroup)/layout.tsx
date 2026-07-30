
import { DashboardNavbar } from "./_components/dashboard-navbar";
import { SidebarNav } from "./_components/sidebar-nav";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r bg-background lg:block">
        <div className="flex h-14 items-center border-b px-6 font-semibold">
          Dashboard
        </div>
        <SidebarNav />
      </aside>

      <div className="flex flex-1 flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
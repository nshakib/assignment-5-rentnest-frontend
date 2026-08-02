import { Suspense } from "react";
import { DashboardShell } from "./_components/dashboard/DashboardShell";
import { DashboardShellSkeleton } from "./_components/dashboard/DashboardShellSkeleton";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<DashboardShellSkeleton />}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
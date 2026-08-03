import { Suspense } from "react";
import { DashboardShell } from "./_components/dashboard/DashboardShell";
import { DashboardShellSkeleton } from "./_components/dashboard/DashboardShellSkeleton";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Suspense fallback={<DashboardShellSkeleton />}>
        <DashboardShell>
          {children}
        </DashboardShell>
      </Suspense>
    </TooltipProvider>
  );
}

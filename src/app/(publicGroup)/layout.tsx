import { Suspense } from "react";
import { PublicShell } from "./_components/PublicShell";
import { PublicShellSkeleton } from "./_components/PublicShellSkeleton";

const PublicGroupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<PublicShellSkeleton />}>
        <PublicShell>{children}</PublicShell>
      </Suspense>
    </div>
  );
};

export default PublicGroupLayout;
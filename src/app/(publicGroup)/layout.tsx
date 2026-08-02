// app/(publicGroup)/layout.tsx
import { Suspense } from "react";
import { Footer } from "./_components/home/footer";
import { PublicShell } from "./_components/PublicShell";
import { PublicShellSkeleton } from "./_components/PublicShellSkeleton";

const PublicGroupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<PublicShellSkeleton />}>
        <PublicShell>{children}</PublicShell>
      </Suspense>
      <Footer />
    </div>
  );
};

export default PublicGroupLayout;
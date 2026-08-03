import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import { NavbarSkeleton } from "@/components/shared/NavbarSkeleton";

async function NavbarWithUser() {
  const user = await getMe();
  return <Navbar user={user} />;
}

const AuthGroupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarWithUser />
      </Suspense>
      {children}
    </div>
  );
};

export default AuthGroupLayout;
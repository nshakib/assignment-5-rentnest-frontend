import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const user = await getMe(); 

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
    </>
  );
}
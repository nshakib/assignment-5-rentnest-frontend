import "server-only";
import { cookies } from "next/headers";
import { IAdminUser } from "@/lib/types";

export async function fetchAllUsers(): Promise<IAdminUser[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
    next: { tags: ["admin-users"] },
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  const result = await res.json();
  return result.data;
}
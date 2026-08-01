"use server"
import { cookies } from "next/headers";
import { ITenantRentalRequest } from "@/lib/types";

export async function fetchTenantRequests(): Promise<ITenantRentalRequest[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals/my-requests`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
    next: { tags: ["tenant-requests"] },
  });

  if (!res.ok) throw new Error("Failed to fetch your requests");

  const result = await res.json();
  return result.data;
}
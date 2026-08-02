"use server";
import { cookies } from "next/headers";
import { IAdminProperty, IAdminRentalRequest } from "@/lib/types";

export async function fetchAllPropertiesForAdmin(): Promise<IAdminProperty[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties/admin/all`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
    next: { tags: ["admin-properties"] },
  });

  if (!res.ok) throw new Error("Failed to fetch properties");

  const result = await res.json();
  const list = result.data.data ?? result.data; // handle either { meta, data } or plain array

  return list.map((p: any) => ({
    ...p,
    monthlyRent: Number(p.monthlyRent),
  }));
}

export async function fetchAllRequestsForAdmin(): Promise<IAdminRentalRequest[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals/admin/all`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
    next: { tags: ["admin-requests"] },
  });

  if (!res.ok) throw new Error("Failed to fetch requests");

  const result = await res.json();
  return result.data.data ?? result.data;
}
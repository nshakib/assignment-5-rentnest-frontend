"use server"

import { cookies } from "next/headers";
import { IProperty } from "@/lib/types";

export async function fetchLandlordProperties(): Promise<IProperty[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/my-properties`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store", // landlord's own data — always fresh, no shared cache
  });

  if (!res.ok) throw new Error("Failed to fetch your properties");

  const result = await res.json();
  return result.data.map((p: any) => ({
    ...p,
    monthlyRent: Number(p.monthlyRent),
    maintenanceFee: p.maintenanceFee != null ? Number(p.maintenanceFee) : null,
  }));
}
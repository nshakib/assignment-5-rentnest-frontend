"use server"

import { cookies } from "next/headers";
import { IProperty } from "@/lib/types";
import { propertySchema } from "@/lib/validators/property";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createActionProperty(values: unknown) {
  const parsed = propertySchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Validation failed", errors: parsed.error.flatten() };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Not authenticated" };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(parsed.data),
  });

  const result = await res.json();

  if (!res.ok) {
    return { success: false, message: result.message ?? "Failed to create property" };
  }

  updateTag("landlord-properties"); // invalidate the dashboard list cache
  updateTag("properties");           // also invalidate public listing cache

  redirect("/dashboard/landlord/properties");
}
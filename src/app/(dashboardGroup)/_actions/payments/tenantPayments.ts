"use server";
import { cookies } from "next/headers";
import { IPayment } from "@/lib/types";

export async function fetchTenantPaymentHistory(): Promise<IPayment[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payment`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
    next: { tags: ["tenant-payments"] },
  });

  if (!res.ok) throw new Error("Failed to fetch payment history");

  const result = await res.json();
  return result.data.data.map((p: any) => ({
    ...p,
    amount: Number(p.amount), // Decimal → number
  }));
}
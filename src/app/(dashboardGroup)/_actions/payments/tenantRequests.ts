
"use server";
import { ITenantRentalRequest } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";

export async function fetchTenantRequestById(id: string): Promise<ITenantRentalRequest | null> {

 const accessToken = await isAccessTokenExist();

  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals/${id}`, {
    method: "GET",
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
  });


  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch request");

  const result = await res.json();
  return result.data; 

}
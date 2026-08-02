"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: { Cookie: `refreshToken=${refreshToken}` },
      });
    } catch {
      
    }
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return { success: true };
}
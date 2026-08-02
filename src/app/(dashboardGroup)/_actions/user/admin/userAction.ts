"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { updateTag } from "next/cache";

export async function updateUserStatusAction(userId: string, activeStatus: "ACTIVE" | "BLOCKED") {
  const accessToken = await isAccessTokenExist();
  if (!accessToken) return { success: false, message: "You must be logged in." };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ activeStatus }),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to update user status" };
  }

  updateTag("admin-users");
  return { success: true, message: `User ${activeStatus === "BLOCKED" ? "banned" : "unbanned"} successfully` };
}
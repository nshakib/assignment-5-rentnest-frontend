"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { updateTag } from "next/cache";

export async function approveRequestAction(requestId: string) {
  const accessToken = await isAccessTokenExist();
  if (!accessToken) return { success: false, message: "You must be logged in." };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals/${requestId}/approve`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status: "APPROVED" }),
    }
  );

  const result = await res.json();
  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to approve request" };
  }

  updateTag("landlord-requests");
  return { success: true, message: "Request approved" };
}

export async function rejectRequestAction(requestId: string) {
  const accessToken = await isAccessTokenExist();
  if (!accessToken) return { success: false, message: "You must be logged in." };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals/${requestId}/reject`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status: "REJECTED" }),
    }
  );

  const result = await res.json();
  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to reject request" };
  }

  updateTag("landlord-requests");
  return { success: true, message: "Request rejected" };
}
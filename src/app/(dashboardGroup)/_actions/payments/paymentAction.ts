"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export async function createCheckoutSessionAction(rentalRequestId: string) {
  const accessToken = await isAccessTokenExist();
  if (!accessToken) {
    return { success: false, message: "Please log in to continue." };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payment/checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ rentalRequestId }),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to start payment" };
  }

  return { success: true, url: result.data.paymentUrl }; // ← paymentUrl, not url
}
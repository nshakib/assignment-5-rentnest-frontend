"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { updateTag } from "next/cache";

export type RentalRequestState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
} | null;

export const createRentalRequestAction = async (
  propertyId: string,
  prevState: RentalRequestState,
  formData: FormData
): Promise<RentalRequestState> => {
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const leaseTermMonths = formData.get("leaseTermMonths") as string;
  const additionalNote = formData.get("additionalNote") as string;

  const errors: Record<string, string[]> = {};

  if (!startDate) errors.startDate = ["Move-in date is required"];
  if (!endDate) errors.endDate = ["Move-out date is required"];
  if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
    errors.endDate = ["End date must be after start date"];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const accessToken = await isAccessTokenExist();
  if (!accessToken) {
    return { success: false, message: "Please log in to request this property." };
  }

  const payload = {
    startDate,
    endDate,
    leaseTermMonths: leaseTermMonths ? Number(leaseTermMonths) : undefined,
    additionalNote: additionalNote || undefined,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals/${propertyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to submit request" };
  }

  updateTag("tenant-requests");

  return { success: true, message: "Request submitted! Waiting for landlord approval." };
};
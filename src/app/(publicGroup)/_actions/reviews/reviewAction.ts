"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { updateTag } from "next/cache";

export type ReviewState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
} | null;

export const createReviewAction = async (
  rentalRequestId: string,
  prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> => {
  const rating = Number(formData.get("rating"));
  const title = formData.get("title") as string;
  const reviewText = formData.get("reviewText") as string;

  const errors: Record<string, string[]> = {};
  if (!rating || rating < 1 || rating > 5) errors.rating = ["Please select a rating from 1 to 5"];
  if (!reviewText || reviewText.trim().length < 10) {
    errors.reviewText = ["Please write at least 10 characters"];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const accessToken = await isAccessTokenExist();
  if (!accessToken) {
    return { success: false, message: "Please log in to leave a review." };
  }

  const payload = {
    rentalRequestId,
    rating,
    title: title || undefined,
    reviewText,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to submit review" };
  }

  updateTag("tenant-requests");

  return { success: true, message: "Review submitted. Thank you!" };
};
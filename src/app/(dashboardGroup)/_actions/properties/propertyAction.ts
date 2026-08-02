"use server";

import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { propertySchema } from "@/lib/validators/property";
import { isAccessTokenExist } from "@/service/refreshToken";

export type PropertyState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
  redirectTo?: string;
} | null;

export const createPropertyAction = async (
  redirectTo: string,
  prevState: PropertyState,
  formData: FormData
): Promise<PropertyState> => {
    console.log("Form entries:", Object.fromEntries(formData.entries()));
  const raw = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    categoryId: formData.get("categoryId"),
    monthlyRent: formData.get("monthlyRent"),
    maintenanceFee: formData.get("maintenanceFee") || undefined,
    areaSqft: formData.get("areaSqft") || undefined,
    bedrooms: formData.get("bedrooms") || undefined,
    bathrooms: formData.get("bathrooms") || undefined,
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood") || undefined,
    streetAddress: formData.get("streetAddress"),
    availableFrom: formData.get("availableFrom"),
    status: formData.get("status") === "on" ? "ACTIVE" : "INACTIVE",
    familyAllowed: formData.get("familyAllowed") === "on",
    bachelorAllowed: formData.get("bachelorAllowed") === "on",
    petsAllowed: formData.get("petsAllowed") === "on",
    smokingAllowed: formData.get("smokingAllowed") === "on",
    images: formData.getAll("images").filter((v) => typeof v === "string" && v.trim() !== ""),
  };

  const parsed = propertySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

 const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You must be logged in." };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(parsed.data),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to create property" };
  }

    updateTag("landlord-properties"); // landlord needs to see their new listing immediately
    updateTag("properties");           // public listing can also update immediately here — cheap operation

  return {
    success: true,
    message: "Property created successfully!",
    redirectTo,
  };
};

// app/(dashboard)/_actions/properties/propertyAction.ts
export const updatePropertyAction = async (
  propertyId: string,
  redirectTo: string,
  prevState: PropertyState,
  formData: FormData
): Promise<PropertyState> => {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    categoryId: formData.get("categoryId"),
    monthlyRent: formData.get("monthlyRent"),
    maintenanceFee: formData.get("maintenanceFee") || undefined,
    areaSqft: formData.get("areaSqft") || undefined,
    bedrooms: formData.get("bedrooms") || undefined,
    bathrooms: formData.get("bathrooms") || undefined,
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood") || undefined,
    streetAddress: formData.get("streetAddress"),
    availableFrom: formData.get("availableFrom"),
    status: formData.get("status") === "on" ? "ACTIVE" : "INACTIVE",
    familyAllowed: formData.get("familyAllowed") === "on",
    bachelorAllowed: formData.get("bachelorAllowed") === "on",
    petsAllowed: formData.get("petsAllowed") === "on",
    smokingAllowed: formData.get("smokingAllowed") === "on",
    images: formData.getAll("images").filter((v) => typeof v === "string" && v.trim() !== ""),
  };

  const parsed = propertySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You must be logged in." };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties/${propertyId}`,
    {
      method: "PATCH", // or PUT, match your backend route
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(parsed.data),
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to update property" };
  }

  updateTag("landlord-properties");
  updateTag("properties");
  updateTag(`property-${propertyId}`); // also bust the single-property detail cache

  return {
    success: true,
    message: "Property updated successfully!",
    redirectTo,
  };
};


export async function deletePropertyAction(propertyId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You must be logged in." };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties/${propertyId}`,
    {
      method: "DELETE",
      headers: { Cookie: `accessToken=${accessToken}` },
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message ?? "Failed to delete property" };
  }

  updateTag("landlord-properties");
  updateTag("properties");

  return { success: true, message: "Property deleted successfully" };
}
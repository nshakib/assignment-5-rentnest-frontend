import { IProperty } from "@/lib/types";
import "server-only";

export function normalizeProperty(p: any): IProperty {
  return {
    ...p,
    monthlyRent: Number(p.monthlyRent),
    maintenanceFee: p.maintenanceFee != null ? Number(p.maintenanceFee) : null,
  };
}
export async function fetchFeaturedProperties(): Promise<IProperty[]> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?limit=3&sort=-createdAt`,
    { next: { revalidate: 3600, tags: ["featured-properties"] } }
  );
  if (!res.ok) throw new Error("Failed to fetch featured properties");

  const result = await res.json();
  return result.data.map(normalizeProperty);
}


export async function fetchAllProperties(query?: {
  [key: string]: string | string[] | undefined;
}) {
  const params = new URLSearchParams();

  if (query?.city) params.set("city", query.city as string);
  if (query?.categoryId) params.set("categoryId", query.categoryId as string);
  if (query?.minRent) params.set("minRent", query.minRent as string);
  if (query?.maxRent) params.set("maxRent", query.maxRent as string);
  if (query?.bedrooms) params.set("bedrooms", query.bedrooms as string);
  if (query?.page) params.set("page", query.page as string);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    { next: { revalidate: 60 * 5, tags: ["properties"] } }
  );

  if (!res.ok) throw new Error("Failed to fetch properties");

  return res.json();
}
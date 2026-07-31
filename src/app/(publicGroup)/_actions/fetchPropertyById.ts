import { IProperty } from "@/lib/types";
import { normalizeProperty } from "./getPropertiesAll";

export async function fetchPropertyById(id: string): Promise<IProperty | null> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
    next: { revalidate: 300, tags: [`property-${id}`] },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch property");

  const result = await res.json();
  return normalizeProperty(result.data);
}
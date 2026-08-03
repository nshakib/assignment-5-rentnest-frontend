"use server";

export interface Category {
  id: string;
  name: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    next: { revalidate: 3600, tags: ["categories"] }, 
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const result = await res.json();
  return result.data;
}
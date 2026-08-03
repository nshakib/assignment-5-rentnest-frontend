// src/app/(dashboardGroup)/landlord-dashboard/properties/new/page.tsx
import { fetchCategories } from "@/app/(dashboardGroup)/_actions/properties/fetchCategories";
import { PropertyForm } from "@/app/(dashboardGroup)/_components/properties/PropertyForm";
import { PropertyFormSkeleton } from "@/app/(dashboardGroup)/_components/properties/PropertyFormSkeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List New Property | RentNest",
  description: "Create a new property listing for rent.",
};

async function CreateNewPropertyPage() {
  let categories: Awaited<ReturnType<typeof fetchCategories>> = [];
  let fetchError: string | null = null;

  try {
    categories = await fetchCategories();
  } catch (error) {
    fetchError = error instanceof Error ? error.message : "Failed to load categories.";
  }

  if (fetchError) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-destructive"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Unable to Load Categories</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">{fetchError}</p>
        <a
          href="/landlord-dashboard/properties/new"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try Again
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-8">
      <Suspense fallback={<PropertyFormSkeleton />}>
        <PropertyForm categories={categories} />
      </Suspense>
    </div>
  );
}

export default CreateNewPropertyPage;
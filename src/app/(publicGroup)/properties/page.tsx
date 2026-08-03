import React, { Suspense } from 'react'
import { PropertiesSkeleton } from '../_components/properties/PropertiesSkeleton'
import { PublicPropertiesList } from '../_components/properties/PublicPropertiesList'
import { fetchCategories } from '@/app/(dashboardGroup)/_actions/properties/fetchCategories';
import { PropertyFilters } from '../_components/properties/PropertyFilters';

export default async function PublicPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categories = await fetchCategories();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">Properties</h1>
        <p className="text-sm text-muted-foreground">
          Browse the latest published properties.
        </p>
      </div>

      <PropertyFilters categories={categories} />

      <Suspense fallback={<PropertiesSkeleton />}>
        <PublicPropertiesList searchParams={params} />
      </Suspense>
    </div>
  );
}
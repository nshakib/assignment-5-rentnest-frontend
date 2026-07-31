import React, { Suspense } from 'react'
import { PropertiesSkeleton } from '../_components/properties/PropertiesSkeleton'
import { PublicPropertiesList } from '../_components/properties/PublicPropertiesList'

const PublicPropertiesPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Properties</h1>
          <p className="text-sm text-muted-foreground">
            Browse the latest published properties.
          </p>
        </div>
      </div>

      <Suspense fallback={<PropertiesSkeleton />}>
        <PublicPropertiesList />
      </Suspense>
    </div>
  )
}

export default PublicPropertiesPage
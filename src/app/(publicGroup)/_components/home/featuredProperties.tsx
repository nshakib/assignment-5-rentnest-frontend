// import { PropertyCard } from "@/app/(publicGroup)/_components/properties/PropertyCard";
// import { Button } from "@/components/ui/button";
// import { fetchFeaturedProperties } from "../../_actions/getPropertiesAll";
// import { IProperty } from "@/lib/types";
// import Link from "next/link";

// export async function FeaturedProperties() {
//   const properties = await fetchFeaturedProperties();

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//       <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
//         Our choice of popular real estate
//       </h2>

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {properties.map((property:IProperty) => (
//       <PropertyCard key={property.id} property={property} />
//     ))}
        
//       </div>

//       <div className="mt-10 text-center">
//         <Button variant="outline" size="lg" asChild>
//             <Link href="/properties">Browse More Properties</Link>
//         </Button>
//       </div>
//     </section>
//   );
// }



// src/app/(publicGroup)/_components/home/featuredProperties.tsx
import { PropertyCard } from "@/app/(publicGroup)/_components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { fetchFeaturedProperties } from "../../_actions/getPropertiesAll";
import { IProperty } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function FeaturedProperties() {
  let properties: IProperty[] = [];
  let hasError = false;

  try {
    properties = await fetchFeaturedProperties();
  } catch {
    hasError = true;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Section Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
              Featured
            </Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
            Popular Real Estate Picks
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base max-w-xl">
            Handpicked properties with the highest ratings and best locations, curated just for you.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex shrink-0 group">
          <Link href="/properties">
            View All
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Content */}
      {hasError ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 py-16 text-center">
          <Home className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">Unable to load featured properties</p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/properties">Browse All Properties</Link>
          </Button>
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 py-16 text-center">
          <Home className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No featured properties available yet</p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/properties">Browse All Properties</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Mobile CTA (visible only on small screens) */}
      <div className="mt-10 text-center sm:hidden">
        <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
          <Link href="/properties">
            Browse More Properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Desktop bottom link (subtle alternative to repeated CTA) */}
      <div className="mt-8 hidden sm:block text-center">
        <Link
          href="/properties"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
        >
          Explore all {properties.length > 0 && `${properties.length}+`} listings
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
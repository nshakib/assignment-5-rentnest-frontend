import { PropertyCard } from "@/app/(publicGroup)/_components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { fetchFeaturedProperties } from "../../_actions/getPropertiesAll";
import { IProperty } from "@/lib/types";
import Link from "next/link";

export async function FeaturedProperties() {
  const properties = await fetchFeaturedProperties();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
        Our choice of popular real estate
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property:IProperty) => (
      <PropertyCard key={property.id} property={property} />
    ))}
        
      </div>

      <div className="mt-10 text-center">
        <Button variant="outline" size="lg" asChild>
            <Link href="/properties">Browse More Properties</Link>
        </Button>
      </div>
    </section>
  );
}
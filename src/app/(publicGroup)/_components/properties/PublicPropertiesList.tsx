import { IProperty, searchParamsProps } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { fetchAllProperties } from "../../_actions/getPropertiesAll";


export async function PublicPropertiesList({ searchParams }: searchParamsProps) {
  const result = await fetchAllProperties(searchParams);

  if (!result.data || result.data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        No properties match your search. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((property: IProperty) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
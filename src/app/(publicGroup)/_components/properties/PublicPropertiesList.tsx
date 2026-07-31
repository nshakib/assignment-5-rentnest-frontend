import { IProperty } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { fetchAllProperties } from "../../_actions/getPropertiesAll";


export async function PublicPropertiesList() {
    const result = await fetchAllProperties();
    
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((property : IProperty | any) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      
    </div>
  );
}
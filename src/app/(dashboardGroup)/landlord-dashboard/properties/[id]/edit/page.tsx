import { notFound } from "next/navigation";
import { PropertyForm } from "@/app/(dashboardGroup)/_components/properties/PropertyForm";
import { fetchCategories } from "@/app/(dashboardGroup)/_actions/properties/fetchCategories";
import { fetchLandlordPropertyById } from "@/app/(dashboardGroup)/_components/properties/LandlordPropertiesList";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [property, categories] = await Promise.all([
    fetchLandlordPropertyById(id),
    fetchCategories(),
  ]);

  if (!property) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
      <PropertyForm
        categories={categories}
        propertyId={property.id}
        defaultValues={{
          title: property.title,
          description: property.description,
          categoryId: property.categoryId,
          monthlyRent: property.monthlyRent,
          maintenanceFee: property.maintenanceFee,
          areaSqft: property.areaSqft,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          city: property.city,
          neighborhood: property.neighborhood,
          streetAddress: property.streetAddress,
          availableFrom: property.availableFrom?.slice(0, 10),
          status: property.status,
          familyAllowed: property.familyAllowed,
          bachelorAllowed: property.bachelorAllowed,
          petsAllowed: property.petsAllowed,
          smokingAllowed: property.smokingAllowed,
          images: property.images?.map((img: { url: string }) => img.url) ?? [],
        }}
      />
    </div>
  );
}
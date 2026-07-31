import { notFound } from "next/navigation";
import { Bath, BedDouble, Ruler, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchPropertyById } from "../../_actions/fetchPropertyById";
import { PropertyGallery } from "../../_components/properties/PropertyGallery";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  const property = await fetchPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PropertyGallery images={property.images} title={property.title} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Badge className="mb-2 capitalize">
              {property.status === "ACTIVE" ? "Available" : property.status}
            </Badge>
            <h1 className="text-2xl font-bold sm:text-3xl">{property.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.streetAddress}, {property.neighborhood ? `${property.neighborhood}, ` : ""}
              {property.city}
            </p>
          </div>

          <div className="flex gap-6 border-y py-4 text-sm">
            <span className="flex items-center gap-2">
              <Ruler className="h-4 w-4" /> {property.areaSqft ?? "—"} m²
            </span>
            <span className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" /> {property.bedrooms ?? "—"} Beds
            </span>
            <span className="flex items-center gap-2">
              <Bath className="h-4 w-4" /> {property.bathrooms ?? "—"} Baths
            </span>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">House Rules</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li>{property.familyAllowed ? "✅" : "❌"} Family allowed</li>
              <li>{property.bachelorAllowed ? "✅" : "❌"} Bachelor allowed</li>
              <li>{property.petsAllowed ? "✅" : "❌"} Pets allowed</li>
              <li>{property.smokingAllowed ? "✅" : "❌"} Smoking allowed</li>
            </ul>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <Badge key={a.id} variant="secondary">{a.name}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — price + landlord + CTA */}
        <aside className="h-fit space-y-4 rounded-xl border p-5 lg:sticky lg:top-24">
          <div>
            <span className="text-2xl font-bold">
              ৳{Number(property.monthlyRent).toLocaleString()}
            </span>
            <span className="text-muted-foreground">/mo</span>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">Listed by</p>
            <p className="font-medium">{property.landlord?.name ?? "Landlord"}</p>
          </div>

          {/* <RequestToRentButton propertyId={property.id} status={property.status} /> */}
          {/* develop later */}
        </aside>
      </div>
    </div>
  );
}
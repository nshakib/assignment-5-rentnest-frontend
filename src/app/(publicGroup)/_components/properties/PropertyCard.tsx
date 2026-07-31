import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IProperty } from "@/lib/types";

export function PropertyCard({ property }: { property: IProperty }) {
  if (!property) {
    return null;
  }
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={property.images?.[0]?.url ?? "/placeholder-property.jpg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute left-3 top-3 capitalize">
            {property.status === "ACTIVE" ? "Available" : property.status}
        </Badge>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{property.category.name}</span>
          <span>•</span>
          <span>{property.streetAddress}</span>
        </div>

        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {property.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold">
              ৳{Number(property.monthlyRent ?? 0).toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </span>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4" /> {property.areaSqft}m²
            </span>
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" /> {property.bathrooms}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
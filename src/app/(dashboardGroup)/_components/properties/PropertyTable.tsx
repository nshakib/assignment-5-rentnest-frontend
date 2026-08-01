
import Link from "next/link";
import { IProperty } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { DeletePropertyButton } from "./DeletePropertyButton";

export function PropertyTable({ properties }: { properties: IProperty[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50 text-left">
          <tr>
            <th className="p-3">Property</th>
            <th className="p-3">Location</th>
            <th className="p-3">Rent</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{property.title}</td>
              <td className="p-3 text-muted-foreground">
                {property.city}{property.neighborhood ? `, ${property.neighborhood}` : ""}
              </td>
              <td className="p-3">৳{Number(property.monthlyRent).toLocaleString()}/mo</td>
              <td className="p-3">
                <Badge variant={property.status === "ACTIVE" ? "default" : "secondary"}>
                  {property.status}
                </Badge>
              </td>
              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/landlord-dashboard/properties/${property.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeletePropertyButton propertyId={property.id} propertyTitle={property.title}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
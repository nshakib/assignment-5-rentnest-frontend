import { Badge } from "@/components/ui/badge";
import { IAdminProperty } from "@/lib/types";

export function AdminPropertiesTable({ properties }: { properties: IAdminProperty[] }) {
  if (properties.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        No properties on the platform yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50 text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Landlord</th>
            <th className="p-3">City</th>
            <th className="p-3">Rent</th>
            <th className="p-3">Status</th>
            <th className="p-3">Listed On</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{p.title}</td>
              <td className="p-3 text-muted-foreground">{p.landlord?.name ?? "—"}</td>
              <td className="p-3 text-muted-foreground">{p.city}</td>
              <td className="p-3">৳{p.monthlyRent.toLocaleString()}</td>
              <td className="p-3">
                <Badge variant={p.status === "ACTIVE" ? "default" : "secondary"}>{p.status}</Badge>
              </td>
              <td className="p-3 text-muted-foreground">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
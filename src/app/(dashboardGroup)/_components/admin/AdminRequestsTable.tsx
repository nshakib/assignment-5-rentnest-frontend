import { Badge } from "@/components/ui/badge";
import { IAdminRentalRequest } from "@/lib/types";

export function AdminRequestsTable({ requests }: { requests: IAdminRentalRequest[] }) {
  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        No rental requests on the platform yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50 text-left">
          <tr>
            <th className="p-3">Property</th>
            <th className="p-3">Tenant</th>
            <th className="p-3">Status</th>
            <th className="p-3">Requested On</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{r.property?.title ?? "—"}</td>
              <td className="p-3 text-muted-foreground">{r.tenant?.name ?? "—"}</td>
              <td className="p-3">
                <Badge variant="outline">{r.status}</Badge>
              </td>
              <td className="p-3 text-muted-foreground">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
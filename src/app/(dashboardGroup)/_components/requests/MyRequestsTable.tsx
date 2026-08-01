import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { ITenantRentalRequest } from "@/lib/types";

export function MyRequestsTable({ requests }: { requests: ITenantRentalRequest[] }) {
  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        <p>You haven't submitted any rental requests yet.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/properties">Browse properties</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50 text-left">
          <tr>
            <th className="p-3">Property</th>
            <th className="p-3">Move-in</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-b last:border-0">
              <td className="p-3 font-medium">
                <Link href={`/properties/${request.propertyId}`} className="hover:underline">
                  {request.property?.title ?? "—"}
                </Link>
              </td>
              <td className="p-3 text-muted-foreground">
                {new Date(request.startDate).toLocaleDateString()}
              </td>
              <td className="p-3">
                <StatusBadge status={request.status} />
              </td>
              <td className="p-3 text-right">
                {request.status === "APPROVED" && (
                  <Button asChild size="sm">
                    <Link href={`/tenant-dashboard/requests/${request.id}/pay`}>Pay Now</Link>
                  </Button>
                )}
                {(request.status === "ACTIVE" || request.status === "COMPLETED") && (
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/tenant-dashboard/requests/${request.id}/review`}>Leave Review</Link>
                  </Button>
                )}
                {request.status === "PENDING" && (
                  <span className="text-muted-foreground">Awaiting approval</span>
                )}
                {request.status === "REJECTED" && (
                  <span className="text-muted-foreground" title={request.rejectionReason ?? ""}>
                    —
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
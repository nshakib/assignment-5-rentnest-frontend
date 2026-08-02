"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { RejectRequestButton } from "./RejectRequestButton";
import { IRentalRequest } from "@/lib/types";
import { approveRequestAction } from "../../_actions/properties/requestAction";

export function RequestsTable({ requests }: { requests: IRentalRequest[] }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticRequests, setOptimisticStatus] = useOptimistic(
    requests,
    (state, { id, status }: { id: string; status: string }) =>
      state.map((r) => (r.id === id ? { ...r, status: status as IRentalRequest["status"] } : r))
  );

  function handleApprove(id: string) {
    startTransition(async () => {
      setOptimisticStatus({ id, status: "APPROVED" });
      const result = await approveRequestAction(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  if (optimisticRequests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        No rental requests yet.
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
            <th className="p-3">Requested On</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {optimisticRequests.map((request) => (
            <tr key={request.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{request.property.title}</td>
              <td className="p-3 text-muted-foreground">{request.tenant.name}</td>
              <td className="p-3 text-muted-foreground">
                {new Date(request.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3">
                <StatusBadge status={request.status} />
              </td>
              <td className="p-3 text-right">
                {request.status === "PENDING" ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      disabled={isPending}
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </Button>
                    <RejectRequestButton requestId={request.id} />
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
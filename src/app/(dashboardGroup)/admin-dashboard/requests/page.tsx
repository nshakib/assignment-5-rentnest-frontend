import { Suspense } from "react";
import { AdminRequestsTable } from "@/app/(dashboardGroup)/_components/admin/AdminRequestsTable";
import { fetchAllRequestsForAdmin } from "../../_actions/properties/admin/adminModeration";

async function RequestsList() {
  const requests = await fetchAllRequestsForAdmin();
  return <AdminRequestsTable requests={requests} />;
}

export default function AdminRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Rental Requests</h1>
      <Suspense fallback={<div className="animate-pulse h-64 rounded-xl bg-muted" />}>
        <RequestsList />
      </Suspense>
    </div>
  );
}
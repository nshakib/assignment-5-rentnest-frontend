import { Suspense } from "react";
import { MyRequestsTable } from "@/app/(dashboardGroup)/_components/requests/MyRequestsTable";
import { fetchTenantRequests } from "../../_actions/rentals/tenantRequests";

async function MyRequestsList() {
  const requests = await fetchTenantRequests();
  return <MyRequestsTable requests={requests} />;
}

export default function TenantRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Requests</h1>
      <Suspense
        fallback={<div className="animate-pulse h-64 rounded-xl bg-muted" />}
      >
        <MyRequestsList />
      </Suspense>
    </div>
  );
}

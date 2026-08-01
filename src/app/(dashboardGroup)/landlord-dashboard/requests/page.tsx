import { Suspense } from "react";
import { RequestsTable } from "@/app/(dashboardGroup)/_components/requests/RequestsTable";
import { fetchLandlordRequests } from "../../_components/properties/LandlordPropertiesList";

async function RequestsList() {
  const requests = await fetchLandlordRequests();
  return <RequestsTable requests={requests} />;
}

export default function LandlordRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Incoming Requests</h1>
      <Suspense fallback={<div className="animate-pulse h-64 rounded-xl bg-muted" />}>
        <RequestsList />
      </Suspense>
    </div>
  );
}
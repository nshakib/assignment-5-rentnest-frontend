// app/(dashboardGroup)/landlord-dashboard/page.tsx
import { Suspense } from "react";
import { Building2, ClipboardList, Wallet } from "lucide-react";
import { fetchLandlordProperties } from "../_actions/properties/landlord-properties";
import { fetchLandlordRequests } from "../_components/properties/LandlordPropertiesList";
import { StatCard } from "../_components/overview/StartCard";


async function OverviewStats() {
  const [properties, requests] = await Promise.all([
    fetchLandlordProperties(),
    fetchLandlordRequests(),
  ]);

  const totalProperties = properties.length;

  const activeRequests = requests.filter(
    (r) => r.status === "PENDING" || r.status === "APPROVED"
  ).length;

  const estimatedMonthlyEarnings = requests
    .filter((r) => r.status === "ACTIVE")
    .reduce((sum, r) => sum + Number(r.property?.monthlyRent ?? 0), 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Total Properties" value={totalProperties} icon={Building2} />
      <StatCard label="Active Requests" value={activeRequests} icon={ClipboardList} />
      <StatCard
        label="Est. Monthly Earnings"
        value={`৳${estimatedMonthlyEarnings.toLocaleString()}`}
        icon={Wallet}
      />
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 rounded-xl border animate-pulse bg-muted" />
      ))}
    </div>
  );
}

export default function LandlordOverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewStats />
      </Suspense>
    </div>
  );
}
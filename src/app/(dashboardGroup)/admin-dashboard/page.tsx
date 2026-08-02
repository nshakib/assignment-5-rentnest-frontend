import { Suspense } from "react";
import { Users, Building2, ClipboardList } from "lucide-react";
import { fetchAllUsers } from "../_actions/user/adminUsers";
import { fetchAllPropertiesForAdmin, fetchAllRequestsForAdmin } from "../_actions/properties/admin/adminModeration";
import { StatCard } from "../_components/overview/StartCard";


async function AdminOverviewStats() {
  const [users, properties, requests] = await Promise.all([
    fetchAllUsers(),
    fetchAllPropertiesForAdmin(),
    fetchAllRequestsForAdmin(),
  ]);

  const totalUsers = users.length;
  const totalProperties = properties.length;
  const pendingRequests = requests.filter((r) => r.status === "PENDING").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Total Users" value={totalUsers} icon={Users} />
      <StatCard label="Total Properties" value={totalProperties} icon={Building2} />
      <StatCard label="Pending Requests" value={pendingRequests} icon={ClipboardList} />
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

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Platform Overview</h1>
      <Suspense fallback={<OverviewSkeleton />}>
        <AdminOverviewStats />
      </Suspense>
    </div>
  );
}
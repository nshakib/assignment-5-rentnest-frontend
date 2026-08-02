// app/(dashboardGroup)/admin-dashboard/properties/page.tsx
import { Suspense } from "react";
import { AdminPropertiesTable } from "@/app/(dashboardGroup)/_components/admin/AdminPropertiesTable";
import { fetchAllPropertiesForAdmin } from "../../_actions/properties/admin/adminModeration";

async function PropertiesList() {
  const properties = await fetchAllPropertiesForAdmin();
  return <AdminPropertiesTable properties={properties} />;
}

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Properties</h1>
      <Suspense fallback={<div className="animate-pulse h-64 rounded-xl bg-muted" />}>
        <PropertiesList />
      </Suspense>
    </div>
  );
}
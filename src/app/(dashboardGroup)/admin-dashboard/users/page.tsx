// app/(dashboardGroup)/admin-dashboard/users/page.tsx
import { Suspense } from "react";
import { UsersTable } from "@/app/(dashboardGroup)/_components/admin/UsersTable";
import { fetchAllUsers } from "../../_actions/user/adminUsers";

async function UsersList() {
  const users = await fetchAllUsers();
  return <UsersTable users={users} />;
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <Suspense fallback={<div className="animate-pulse h-64 rounded-xl bg-muted" />}>
        <UsersList />
      </Suspense>
    </div>
  );
}
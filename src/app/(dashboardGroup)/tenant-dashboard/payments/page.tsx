import { Suspense } from "react";
import { PaymentHistoryTable } from "@/app/(dashboardGroup)/_components/payments/PaymentHistoryTable";
import { fetchTenantPaymentHistory } from "../../_actions/payments/tenantPayments";

async function PaymentsList() {
  const payments = await fetchTenantPaymentHistory();
  return <PaymentHistoryTable payments={payments} />;
}

export default function TenantPaymentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Payments</h1>
      <Suspense fallback={<div className="animate-pulse h-64 rounded-xl bg-muted" />}>
        <PaymentsList />
      </Suspense>
    </div>
  );
}
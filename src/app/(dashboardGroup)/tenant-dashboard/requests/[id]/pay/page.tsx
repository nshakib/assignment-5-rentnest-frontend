import { notFound } from "next/navigation";
import { PayButton } from "@/app/(dashboardGroup)/_components/payments/PayButton";
import { fetchTenantRequestById } from "@/app/(dashboardGroup)/_actions/payments/tenantRequests";

export default async function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let request;
  try {
    request = await fetchTenantRequestById(id);
  } catch (error) {
    console.error("Failed to fetch tenant request:", error);
    throw new Error("Unable to load payment details. Please try again.");
  }

  if (!request) notFound();

  if (request.status !== "APPROVED") {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-2">
        <p className="text-muted-foreground">This request is not ready for payment.</p>
        <p className="text-sm text-muted-foreground">
          Current status: <span className="font-medium">{request.status}</span>
        </p>
      </div>
    );
  }

  const monthlyRent = Number(request.property.monthlyRent) || 0;

  return (
    <div className="max-w-md mx-auto space-y-6 py-10">
      <h1 className="text-2xl font-bold">Confirm Payment</h1>
      <div className="rounded-xl border p-4 space-y-2">
        <p className="font-medium">{request.property.title}</p>
        <p className="text-2xl font-bold" aria-label={`Monthly rent: ${monthlyRent} Taka`}>
          ৳{monthlyRent.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground"> /mo</span>
        </p>
      </div>
      <PayButton rentalRequestId={request.id} />
    </div>
  );
}
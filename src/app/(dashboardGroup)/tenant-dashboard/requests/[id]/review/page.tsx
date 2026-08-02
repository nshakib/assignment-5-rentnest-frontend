import { notFound } from "next/navigation";
import { fetchTenantRequestById } from "@/app/(dashboardGroup)/_actions/payments/tenantRequests";
import { ReviewForm } from "@/app/(publicGroup)/_components/reviews/ReviewForm";

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await fetchTenantRequestById(id);

  if (!request) notFound();

  if (request.status !== "ACTIVE" && request.status !== "COMPLETED") {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <p className="text-muted-foreground">You can only review after your rental is active.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Leave a Review</h1>
      <p className="text-muted-foreground">{request.property.title}</p>
      <ReviewForm rentalRequestId={request.id} />
    </div>
  );
}
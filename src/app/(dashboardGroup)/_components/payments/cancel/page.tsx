import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-4">
      <XCircle className="mx-auto h-16 w-16 text-red-500" />
      <h1 className="text-2xl font-bold">Payment Cancelled</h1>
      <p className="text-muted-foreground">
        No subscription was started. You can try again anytime from your requests list.
      </p>
      <Button asChild className="w-full">
        <Link href="/tenant-dashboard/requests">Back to My Requests</Link>
      </Button>
    </div>
  );
}
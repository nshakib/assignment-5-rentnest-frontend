// src/app/(dashboardGroup)/payment/success/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ rentalRequestId?: string }> 
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6 p-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
        
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        
        <p className="text-muted-foreground">
          Your first month's rent has been paid. Your subscription is now active 
          and you'll be billed monthly going forward.
        </p>

        <div className="space-y-3 pt-4">
          <Button asChild className="w-full">
            <Link href="/tenant-dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/tenant-dashboard/requests">View My Requests</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
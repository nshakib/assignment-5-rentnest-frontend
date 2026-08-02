"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createCheckoutSessionAction } from "../../_actions/payments/paymentAction";

export function PayButton({ rentalRequestId }: { rentalRequestId: string }) {
  const [isPending, startTransition] = useTransition();

  function handlePay() {
    startTransition(async () => {
      const result = await createCheckoutSessionAction(rentalRequestId);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="space-y-2">
      <Button onClick={handlePay} disabled={isPending} className="w-full">
        {isPending ? "Redirecting to payment..." : "Set Up Monthly Payment"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        You'll be charged monthly via Stripe until the lease ends.
      </p>
    </div>
  );
}
// app/(dashboardGroup)/_components/reviews/ReviewForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createReviewAction, ReviewState } from "../../_actions/reviews/reviewAction";

const initialState: ReviewState = null;

export function ReviewForm({ rentalRequestId }: { rentalRequestId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [state, formAction, isPending] = useActionState(
    (prevState: ReviewState, formData: FormData) =>
      createReviewAction(rentalRequestId, prevState, formData),
    initialState
  );

 useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/tenant-dashboard/requests");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4 max-w-lg">
      <input type="hidden" name="rating" value={rating} />

      <Field data-invalid={!!state?.errors?.rating}>
        <FieldLabel>Rating</FieldLabel>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Star
                className={`h-7 w-7 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        {state?.errors?.rating && (
          <FieldError errors={state.errors.rating.map((m) => ({ message: m }))} />
        )}
      </Field>

      <Field data-invalid={!!state?.errors?.title}>
        <FieldLabel htmlFor="title">Title (optional)</FieldLabel>
        <Input id="title" name="title" placeholder="Great place to live" />
      </Field>

      <Field data-invalid={!!state?.errors?.reviewText}>
        <FieldLabel htmlFor="reviewText">Your Review</FieldLabel>
        <Textarea id="reviewText" name="reviewText" rows={5} placeholder="Share your experience..." />
        {state?.errors?.reviewText && (
          <FieldError errors={state.errors.reviewText.map((m) => ({ message: m }))} />
        )}
      </Field>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
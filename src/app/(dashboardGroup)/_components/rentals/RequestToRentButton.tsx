"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createRentalRequestAction,
  RentalRequestState,
} from "../../_actions/rentals/rentalRequestAction";

const initialState: RentalRequestState = null;

export function RequestToRentButton({
  propertyId,
  status,
}: {
  propertyId: string;
  status: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    (prevState: RentalRequestState, formData: FormData) =>
      createRentalRequestAction(propertyId, prevState, formData),
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setOpen(false);
    } else if (state && !state.success && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  if (status !== "ACTIVE") {
    return (
      <Button disabled className="w-full">
        Not Available
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Request to Rent</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to Rent</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field data-invalid={!!state?.errors?.startDate}>
              <FieldLabel htmlFor="startDate">Move-in Date</FieldLabel>
              <Input id="startDate" name="startDate" type="date" />
              {state?.errors?.startDate && (
                <FieldError
                  errors={state.errors.startDate.map((m) => ({ message: m }))}
                />
              )}
            </Field>
            <Field data-invalid={!!state?.errors?.endDate}>
              <FieldLabel htmlFor="endDate">Move-out Date</FieldLabel>
              <Input id="endDate" name="endDate" type="date" />
              {state?.errors?.endDate && (
                <FieldError
                  errors={state.errors.endDate.map((m) => ({ message: m }))}
                />
              )}
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="leaseTermMonths">
              Lease Term (months)
            </FieldLabel>
            <Input
              id="leaseTermMonths"
              name="leaseTermMonths"
              type="number"
              placeholder="e.g. 12"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="additionalNote">
              Note to Landlord (optional)
            </FieldLabel>
            <Textarea
              id="additionalNote"
              name="additionalNote"
              rows={3}
              placeholder="Anything the landlord should know..."
            />
          </Field>

          <DialogFooter>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

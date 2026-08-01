"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createPropertyAction, PropertyState, updatePropertyAction } from "../../_actions/properties/propertyAction";

interface Category {
  id: string;
  name: string;
}

interface PropertyDefaults {
  title?: string;
  description?: string;
  categoryId?: string;
  monthlyRent?: number;
  maintenanceFee?: number;
  areaSqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  neighborhood?: string;
  streetAddress?: string;
  availableFrom?: string;
  status?: "ACTIVE" | "INACTIVE";
  familyAllowed?: boolean;
  bachelorAllowed?: boolean;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  images?: string[];
}

const initialState: PropertyState = null;

export function PropertyForm({
  categories,
  defaultValues,
  redirectTo = "/landlord-dashboard/properties",
  propertyId  ,
}: {
  categories: Category[];
  defaultValues?: PropertyDefaults;
  redirectTo?: string;
  propertyId?: string;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
  (prevState: PropertyState, formData: FormData) =>
    propertyId
        ? updatePropertyAction(propertyId, redirectTo, prevState, formData)
        : createPropertyAction(redirectTo, prevState, formData),
    initialState
  );

  
  const [categoryId, setCategoryId] = useState(defaultValues?.categoryId ?? "");
  const [status, setStatus] = useState(defaultValues?.status !== "INACTIVE");
  const [familyAllowed, setFamilyAllowed] = useState(defaultValues?.familyAllowed ?? false);
  const [bachelorAllowed, setBachelorAllowed] = useState(defaultValues?.bachelorAllowed ?? false);
  const [petsAllowed, setPetsAllowed] = useState(defaultValues?.petsAllowed ?? false);
  const [smokingAllowed, setSmokingAllowed] = useState(defaultValues?.smokingAllowed ?? false);
  const [imageInputs, setImageInputs] = useState<string[]>(
    defaultValues?.images?.length ? defaultValues.images : [""]
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (state.redirectTo) router.push(state.redirectTo);
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <Field data-invalid={!!state?.errors?.title}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input id="title" name="title" defaultValue={defaultValues?.title} placeholder="Cozy 2BR apartment in Gulshan" />
        {state?.errors?.title && <FieldError errors={state.errors.title.map((m) => ({ message: m }))} />}
      </Field>

      <Field data-invalid={!!state?.errors?.description}>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea id="description" name="description" rows={4} defaultValue={defaultValues?.description} />
        {state?.errors?.description && <FieldError errors={state.errors.description.map((m) => ({ message: m }))} />}
      </Field>

      <Field data-invalid={!!state?.errors?.categoryId}>
        <FieldLabel htmlFor="categoryId">Category</FieldLabel>
        <input type="hidden" name="categoryId" value={categoryId} />
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger id="categoryId">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.categoryId && <FieldError errors={state.errors.categoryId.map((m) => ({ message: m }))} />}
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field data-invalid={!!state?.errors?.monthlyRent}>
          <FieldLabel htmlFor="monthlyRent">Monthly Rent (৳)</FieldLabel>
          <Input id="monthlyRent" name="monthlyRent" type="number" defaultValue={defaultValues?.monthlyRent} />
          {state?.errors?.monthlyRent && <FieldError errors={state.errors.monthlyRent.map((m) => ({ message: m }))} />}
        </Field>
        <Field data-invalid={!!state?.errors?.maintenanceFee}>
          <FieldLabel htmlFor="maintenanceFee">Maintenance Fee (৳)</FieldLabel>
          <Input id="maintenanceFee" name="maintenanceFee" type="number" defaultValue={defaultValues?.maintenanceFee} />
          {state?.errors?.maintenanceFee && <FieldError errors={state.errors.maintenanceFee.map((m) => ({ message: m }))} />}
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field data-invalid={!!state?.errors?.areaSqft}>
          <FieldLabel htmlFor="areaSqft">Area (sqft)</FieldLabel>
          <Input id="areaSqft" name="areaSqft" type="number" defaultValue={defaultValues?.areaSqft} />
          {state?.errors?.areaSqft && <FieldError errors={state.errors.areaSqft.map((m) => ({ message: m }))} />}
        </Field>
        <Field data-invalid={!!state?.errors?.bedrooms}>
          <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
          <Input id="bedrooms" name="bedrooms" type="number" defaultValue={defaultValues?.bedrooms} />
          {state?.errors?.bedrooms && <FieldError errors={state.errors.bedrooms.map((m) => ({ message: m }))} />}
        </Field>
        <Field data-invalid={!!state?.errors?.bathrooms}>
          <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
          <Input id="bathrooms" name="bathrooms" type="number" defaultValue={defaultValues?.bathrooms} />
          {state?.errors?.bathrooms && <FieldError errors={state.errors.bathrooms.map((m) => ({ message: m }))} />}
        </Field>
      </div>

      <Field data-invalid={!!state?.errors?.city}>
        <FieldLabel htmlFor="city">City</FieldLabel>
        <Input id="city" name="city" defaultValue={defaultValues?.city} />
        {state?.errors?.city && <FieldError errors={state.errors.city.map((m) => ({ message: m }))} />}
      </Field>

      <Field data-invalid={!!state?.errors?.neighborhood}>
        <FieldLabel htmlFor="neighborhood">Neighborhood</FieldLabel>
        <Input id="neighborhood" name="neighborhood" defaultValue={defaultValues?.neighborhood} />
        {state?.errors?.neighborhood && <FieldError errors={state.errors.neighborhood.map((m) => ({ message: m }))} />}
      </Field>

      <Field data-invalid={!!state?.errors?.streetAddress}>
        <FieldLabel htmlFor="streetAddress">Street Address</FieldLabel>
        <Input id="streetAddress" name="streetAddress" defaultValue={defaultValues?.streetAddress} />
        {state?.errors?.streetAddress && <FieldError errors={state.errors.streetAddress.map((m) => ({ message: m }))} />}
      </Field>

      <Field data-invalid={!!state?.errors?.availableFrom}>
        <FieldLabel htmlFor="availableFrom">Available From</FieldLabel>
        <Input id="availableFrom" name="availableFrom" type="date" defaultValue={defaultValues?.availableFrom} />
        {state?.errors?.availableFrom && <FieldError errors={state.errors.availableFrom.map((m) => ({ message: m }))} />}
      </Field>

      {/* Availability toggle */}
      <Field orientation="horizontal">
        <input type="hidden" name="status" value={status ? "on" : ""} />
        <Checkbox id="status" checked={status} onCheckedChange={(c) => setStatus(!!c)} />
        <FieldLabel htmlFor="status">Available for rent</FieldLabel>
      </Field>

      {/* House rules */}
      <div className="grid grid-cols-2 gap-3">
        <Field orientation="horizontal">
          <input type="hidden" name="familyAllowed" value={familyAllowed ? "on" : ""} />
          <Checkbox id="familyAllowed" checked={familyAllowed} onCheckedChange={(c) => setFamilyAllowed(!!c)} />
          <FieldLabel htmlFor="familyAllowed">Family allowed</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <input type="hidden" name="bachelorAllowed" value={bachelorAllowed ? "on" : ""} />
          <Checkbox id="bachelorAllowed" checked={bachelorAllowed} onCheckedChange={(c) => setBachelorAllowed(!!c)} />
          <FieldLabel htmlFor="bachelorAllowed">Bachelor allowed</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <input type="hidden" name="petsAllowed" value={petsAllowed ? "on" : ""} />
          <Checkbox id="petsAllowed" checked={petsAllowed} onCheckedChange={(c) => setPetsAllowed(!!c)} />
          <FieldLabel htmlFor="petsAllowed">Pets allowed</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <input type="hidden" name="smokingAllowed" value={smokingAllowed ? "on" : ""} />
          <Checkbox id="smokingAllowed" checked={smokingAllowed} onCheckedChange={(c) => setSmokingAllowed(!!c)} />
          <FieldLabel htmlFor="smokingAllowed">Smoking allowed</FieldLabel>
        </Field>
      </div>

      {/* Image URLs — plain useState array, no useFieldArray needed */}
      <div>
        <FieldLabel>Image URLs</FieldLabel>
        <div className="space-y-2 mt-1">
          {imageInputs.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                name="images"
                placeholder="https://..."
                defaultValue={url}
              />
              {imageInputs.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setImageInputs((prev) => prev.filter((_, i) => i !== index))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => setImageInputs((prev) => [...prev, ""])}
        >
          <Plus className="h-4 w-4 mr-1" /> Add another image
        </Button>
        {state?.errors?.images && <FieldError errors={state.errors.images.map((m) => ({ message: m }))} />}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Saving..." : propertyId ? "Update Property" : "Create Property"}
      </Button>
    </form>
  );
}
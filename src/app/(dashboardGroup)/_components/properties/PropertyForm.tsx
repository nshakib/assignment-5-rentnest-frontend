"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Plus, Loader2, Image as ImageIcon, MapPin, Home, DollarSign, CalendarDays, ShieldCheck } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
  propertyId,
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

  const isEditing = !!propertyId;

  return (
    <form action={formAction} className="max-w-3xl mx-auto space-y-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {isEditing ? "Edit Property" : "List New Property"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEditing
              ? "Update your property listing details below."
              : "Fill in the details to list your property for rent."}
          </p>
        </div>
        {isEditing && (
          <Badge variant="outline" className="shrink-0 border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300">
            Editing
          </Badge>
        )}
      </div>

      {/* ─── Basic Information ─── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Home className="h-5 w-5 text-indigo-500" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field data-invalid={!!state?.errors?.title}>
            <FieldLabel htmlFor="title">Property Title</FieldLabel>
            <Input
              id="title"
              name="title"
              defaultValue={defaultValues?.title}
              placeholder="e.g., Cozy 2BR apartment in Gulshan"
              className="mt-1.5"
            />
            {state?.errors?.title && <FieldError errors={state.errors.title.map((m) => ({ message: m }))} />}
          </Field>

          <Field data-invalid={!!state?.errors?.description}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={defaultValues?.description}
              placeholder="Describe the property, amenities, nearby landmarks..."
              className="mt-1.5 resize-y min-h-[100px]"
            />
            {state?.errors?.description && <FieldError errors={state.errors.description.map((m) => ({ message: m }))} />}
          </Field>

          <Field data-invalid={!!state?.errors?.categoryId}>
            <FieldLabel htmlFor="categoryId">Category</FieldLabel>
            <input type="hidden" name="categoryId" value={categoryId} />
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="categoryId" className="mt-1.5">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.categoryId && <FieldError errors={state.errors.categoryId.map((m) => ({ message: m }))} />}
          </Field>
        </CardContent>
      </Card>

      {/* ─── Pricing & Size ─── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            Pricing & Size
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field data-invalid={!!state?.errors?.monthlyRent}>
              <FieldLabel htmlFor="monthlyRent">Monthly Rent (৳)</FieldLabel>
              <Input id="monthlyRent" name="monthlyRent" type="number" min="0" defaultValue={defaultValues?.monthlyRent} className="mt-1.5" />
              {state?.errors?.monthlyRent && <FieldError errors={state.errors.monthlyRent.map((m) => ({ message: m }))} />}
            </Field>
            <Field data-invalid={!!state?.errors?.maintenanceFee}>
              <FieldLabel htmlFor="maintenanceFee">Maintenance Fee (৳)</FieldLabel>
              <Input id="maintenanceFee" name="maintenanceFee" type="number" min="0" defaultValue={defaultValues?.maintenanceFee} className="mt-1.5" />
              {state?.errors?.maintenanceFee && <FieldError errors={state.errors.maintenanceFee.map((m) => ({ message: m }))} />}
            </Field>
            <Field data-invalid={!!state?.errors?.areaSqft}>
              <FieldLabel htmlFor="areaSqft">Area (sqft)</FieldLabel>
              <Input id="areaSqft" name="areaSqft" type="number" min="0" defaultValue={defaultValues?.areaSqft} className="mt-1.5" />
              {state?.errors?.areaSqft && <FieldError errors={state.errors.areaSqft.map((m) => ({ message: m }))} />}
            </Field>
            <Field data-invalid={!!state?.errors?.bedrooms}>
              <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
              <Input id="bedrooms" name="bedrooms" type="number" min="0" defaultValue={defaultValues?.bedrooms} className="mt-1.5" />
              {state?.errors?.bedrooms && <FieldError errors={state.errors.bedrooms.map((m) => ({ message: m }))} />}
            </Field>
            <Field data-invalid={!!state?.errors?.bathrooms}>
              <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
              <Input id="bathrooms" name="bathrooms" type="number" min="0" defaultValue={defaultValues?.bathrooms} className="mt-1.5" />
              {state?.errors?.bathrooms && <FieldError errors={state.errors.bathrooms.map((m) => ({ message: m }))} />}
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* ─── Location ─── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-rose-500" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field data-invalid={!!state?.errors?.city}>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" name="city" defaultValue={defaultValues?.city} placeholder="e.g., Dhaka" className="mt-1.5" />
              {state?.errors?.city && <FieldError errors={state.errors.city.map((m) => ({ message: m }))} />}
            </Field>
            <Field data-invalid={!!state?.errors?.neighborhood}>
              <FieldLabel htmlFor="neighborhood">Neighborhood</FieldLabel>
              <Input id="neighborhood" name="neighborhood" defaultValue={defaultValues?.neighborhood} placeholder="e.g., Gulshan 2" className="mt-1.5" />
              {state?.errors?.neighborhood && <FieldError errors={state.errors.neighborhood.map((m) => ({ message: m }))} />}
            </Field>
          </div>
          <Field data-invalid={!!state?.errors?.streetAddress}>
            <FieldLabel htmlFor="streetAddress">Street Address</FieldLabel>
            <Input id="streetAddress" name="streetAddress" defaultValue={defaultValues?.streetAddress} placeholder="House #, Road #, Block..." className="mt-1.5" />
            {state?.errors?.streetAddress && <FieldError errors={state.errors.streetAddress.map((m) => ({ message: m }))} />}
          </Field>
        </CardContent>
      </Card>

      {/* ─── Availability & Rules ─── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-500" />
            Availability & House Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field data-invalid={!!state?.errors?.availableFrom}>
            <FieldLabel htmlFor="availableFrom">Available From</FieldLabel>
            <Input id="availableFrom" name="availableFrom" type="date" defaultValue={defaultValues?.availableFrom} className="mt-1.5" />
            {state?.errors?.availableFrom && <FieldError errors={state.errors.availableFrom.map((m) => ({ message: m }))} />}
          </Field>

          <Separator />

          <div className="space-y-3">
            <FieldLabel className="text-sm font-medium">Status</FieldLabel>
            <Field orientation="horizontal" className="gap-3">
              <input type="hidden" name="status" value={status ? "on" : ""} />
              <Checkbox id="status" checked={status} onCheckedChange={(c) => setStatus(!!c)} />
              <FieldLabel htmlFor="status" className="font-normal cursor-pointer">
                Available for rent
              </FieldLabel>
            </Field>
          </div>

          <Separator />

          <div className="space-y-3">
            <FieldLabel className="text-sm font-medium">House Rules</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "familyAllowed", label: "Family allowed", state: familyAllowed, setter: setFamilyAllowed },
                { id: "bachelorAllowed", label: "Bachelor allowed", state: bachelorAllowed, setter: setBachelorAllowed },
                { id: "petsAllowed", label: "Pets allowed", state: petsAllowed, setter: setPetsAllowed },
                { id: "smokingAllowed", label: "Smoking allowed", state: smokingAllowed, setter: setSmokingAllowed },
              ].map((rule) => (
                <Field key={rule.id} orientation="horizontal" className="gap-3">
                  <input type="hidden" name={rule.id} value={rule.state ? "on" : ""} />
                  <Checkbox
                    id={rule.id}
                    checked={rule.state}
                    onCheckedChange={(c) => rule.setter(!!c)}
                  />
                  <FieldLabel htmlFor={rule.id} className="font-normal cursor-pointer">
                    {rule.label}
                  </FieldLabel>
                </Field>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Images ─── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-blue-500" />
            Property Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Add image URLs for your property. First image will be used as the cover photo.
          </p>
          <div className="space-y-2">
            {imageInputs.map((url, index) => (
              <div key={index} className="flex gap-2 items-start group">
                <div className="flex-1">
                  <Input
                    name="images"
                    placeholder={`https://example.com/image-${index + 1}.jpg`}
                    defaultValue={url}
                    className="transition-colors focus-visible:ring-indigo-500"
                  />
                </div>
                {imageInputs.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setImageInputs((prev) => prev.filter((_, i) => i !== index))}
                    className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    aria-label={`Remove image ${index + 1}`}
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
            onClick={() => setImageInputs((prev) => [...prev, ""])}
            className="border-dashed border-2"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Add Another Image
          </Button>
          {state?.errors?.images && <FieldError errors={state.errors.images.map((m) => ({ message: m }))} />}
        </CardContent>
      </Card>

      {/* ─── Submit ─── */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 pb-8">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full sm:flex-1 sm:max-w-xs"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : isEditing ? "Update Property" : "Create Property"}
        </Button>
      </div>
    </form>
  );
}
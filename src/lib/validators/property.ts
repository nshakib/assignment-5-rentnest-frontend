import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(255),
  description: z.string().max(2000).optional(),
  categoryId: z.string().min(1, "Please select a category"),
  monthlyRent: z.coerce.number().positive("Rent must be greater than 0"),
  maintenanceFee: z.coerce.number().min(0).optional(),
  areaSqft: z.coerce.number().positive().optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  city: z.string().min(2, "City is required"),
  neighborhood: z.string().optional(),
  streetAddress: z.string().min(5, "Street address is required"),
  familyAllowed: z.boolean().default(false),
  bachelorAllowed: z.boolean().default(false),
  petsAllowed: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  availableFrom: z.string().min(1, "Available date is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"), // used as the "availability toggle"
  images: z
    .array(z.string().url("Must be a valid URL"))
    .min(1, "Add at least one image URL"),
});
export type PropertyFormInput = z.input<typeof propertySchema>; 
export type PropertyFormValues = z.infer<typeof propertySchema>;
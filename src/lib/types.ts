import {  LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IProperty {
  id: string;
  landlordId: string;
  categoryId: string;
  title: string;
  description: string | null;
  areaSqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  monthlyRent: number;           // Decimal → number after serialization
  maintenanceFee: number | null;
  city: string;
  neighborhood: string | null;
  streetAddress: string;
  status: string;                 // or a union if you know the fixed values, e.g. "ACTIVE" | "RENTED" | "INACTIVE"
  familyAllowed: boolean;
  bachelorAllowed: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  availableFrom: string;          // dates come over JSON as ISO strings, not Date objects
  createdAt: string;
  updatedAt: string;
  landlord: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  images: {
    id: string;
    imageUrl: string;
    isPrimary: boolean; 
  }[];
  amenities?: {
    id: string;
    name: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
}

type Role = "TENANT" | "LANDLORD" | "ADMIN";

type IUser = {
    success: boolean,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        activeStatus: string,
        role: Role,
        createdAt: string,
        updatedAt: string,
    }
}

export type NavbarProps = {
    user: IUser
}

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}


export interface ActionResult<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  fieldErrors?: Record<string, string[]>;
}

export interface IRentalRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  createdAt: string;
  property: {
    id: string;
    title: string;
    monthlyRent: number;

  };
  tenant: {
    id: string;
    name: string;
  };
}

export interface ITenantRentalRequest {
  id: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  leaseTermMonths: number | null;
  additionalNote: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  rejectionReason: string | null;
  createdAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    monthlyRent: number;
    images: { imageUrl: string; isPrimary: boolean }[];
  };
  
}


export interface IPayment {
  id: string;
  rentalRequestId: string;
  amount: number;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED"; // confirm exact enum values from the schema
  stripeInvoiceId: string | null;
  paidAt: string | null;
  failureReason: string | null;
  createdAt: string;
  rentalRequest: {
    property: {
      id: string;
      title: string;
      city: string;
    };
  };
}


export interface IReview {
  id: string;
  propertyId: string;
  rentalRequestId: string;
  rating: number;
  title: string | null;
  reviewText: string;
  landlordReplyText: string | null;
  createdAt: string;
}

export interface LandlordDashboardStats {
  totalProperties: number;
  activeRequests: number;
  totalEarnings: number;
  pendingRequests: number;
}

export interface PropertySummary {
  id: string;
  title: string;
  city: string;
  monthlyRent: number;
  status: string;
  createdAt: string;
  images: Array<{ imageUrl: string; isPrimary: boolean }>;
}

export interface RentalRequestActivity {
  id: string;
  tenantName: string;
  propertyName: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  amount: number;
  createdAt: string;
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  activeStatus: "ACTIVE" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
}

export interface IAdminProperty {
  id: string;
  title: string;
  city: string;
  monthlyRent: number;
  status: string;
  landlord: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export interface IAdminRentalRequest {
  id: string;
  status: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    landlordId: string;
  };
  tenant: {
    id: string;
    name: string;
    email: string;
  };
}
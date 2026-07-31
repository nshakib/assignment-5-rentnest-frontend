import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  priceType: "sale" | "rent";
  currency: string;
  category: "Apartments" | "Condos" | "Houses" | "Villas";
  location: string;
  size: number; // m2
  bedrooms: number;
  bathrooms: number;
  images: string[];
  agent: {
    name: string;
    avatarUrl: string;
    profileUrl: string;
  };
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
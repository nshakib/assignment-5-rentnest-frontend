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
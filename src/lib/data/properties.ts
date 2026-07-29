import { Property } from "@/lib/types";

const mockProperties: Property[] = [
  {
    id: "1",
    slug: "south-sun-house",
    title: "South Sun House",
    description: "Lorem ipsum dolor sit amet, wisi nemore fastidii at vis.",
    price: 265000,
    priceType: "sale",
    currency: "$",
    category: "Villas",
    location: "Brooklyn",
    size: 290,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/images/properties/south-sun-house.jpg"],
    agent: {
      name: "Steve Parker",
      avatarUrl: "/images/agents/steve-parker.jpg",
      profileUrl: "/agents/steve-parker",
    },
  },
  // ...add 5-6 more matching the reference site's cards
];

export async function fetchFeaturedProperties(): Promise<Property[]> {
  // Later: return fetch(`${process.env.API_URL}/properties?featured=true`).then(r => r.json())
  return mockProperties;
}
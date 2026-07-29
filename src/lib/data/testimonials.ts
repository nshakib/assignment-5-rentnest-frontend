import { Testimonial } from "@/lib/types";

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Toby Young",
    role: "Manager",
    avatarUrl: "/images/testimonials/toby-young.jpg",
    quote:
      "Working with this team made buying our first home simple and stress-free from start to finish.",
  },
  {
    id: "2",
    name: "Anne Reid",
    role: "Sales Advisor",
    avatarUrl: "/images/testimonials/anne-reid.jpg",
    quote:
      "Transparent pricing and a genuinely helpful agent — exactly what we needed for our sale.",
  },
  {
    id: "3",
    name: "Mark Hagne",
    role: "Agent",
    avatarUrl: "/images/testimonials/mark-hagne.jpg",
    quote:
      "The platform made it easy to list and manage inquiries without any hidden fees.",
  },
];

export async function fetchTestimonials(): Promise<Testimonial[]> {
  // Later: return fetch(`${process.env.API_URL}/testimonials`).then(r => r.json())
  return mockTestimonials;
}
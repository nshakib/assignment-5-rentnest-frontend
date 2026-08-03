// _components/home/HeroSearch.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface SearchFormData {
  categoryId: string;
  city: string;
  minRent: string;
  maxRent: string;
}

export function HeroSearch({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [formData, setFormData] = useState<SearchFormData>({
    categoryId: "",
    city: "",
    minRent: "",
    maxRent: "",
  });

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (formData.categoryId) params.set("categoryId", formData.categoryId);
    if (formData.city) params.set("city", formData.city);
    if (formData.minRent) params.set("minRent", formData.minRent);
    if (formData.maxRent) params.set("maxRent", formData.maxRent);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 w-full max-w-5xl text-center">
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Find your next rental{" "}
          <br className="hidden sm:block" />
          <span className="text-emerald-400">with no commission</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-300 sm:text-xl">
          Browse thousands of verified rental listings
        </p>

        <div className="mt-10 rounded-2xl bg-white p-5 shadow-2xl sm:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category — now dynamic */}
            <div className="relative">
              <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 z-10" />
              <Select
                value={formData.categoryId}
                onValueChange={(value) => handleInputChange("categoryId", value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City — free text, matches your real city data */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="City (e.g. Dhaka)"
                className="pl-10"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>

            {/* Min Rent */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Min Rent (৳)"
                type="number"
                className="pl-10"
                value={formData.minRent}
                onChange={(e) => handleInputChange("minRent", e.target.value)}
              />
            </div>

            <Button
              className="w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative lg:col-span-3">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Max Rent (optional)"
                type="number"
                className="pl-10"
                value={formData.maxRent}
                onChange={(e) => handleInputChange("maxRent", e.target.value)}
              />
            </div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
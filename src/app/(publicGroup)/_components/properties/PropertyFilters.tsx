"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePropertyFilterStore } from "@/store/propertyFilterStore";

interface Category {
  id: string;
  name: string;
}

export function PropertyFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    city,
    categoryId,
    minRent,
    maxRent,
    setFilters,
    initialize,
    reset,
  } = usePropertyFilterStore();

  // Sync URL -> Zustand
  useEffect(() => {
    initialize({
      city: searchParams.get("city") ?? "",
      categoryId: searchParams.get("categoryId") ?? "",
      minRent: searchParams.get("minRent") ?? "",
      maxRent: searchParams.get("maxRent") ?? "",
    });
  }, [searchParams, initialize]);

  function applyFilters() {
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (categoryId) params.set("categoryId", categoryId);
    if (minRent) params.set("minRent", minRent);
    if (maxRent) params.set("maxRent", maxRent);

    router.push(`/properties?${params.toString()}`);
  }

  function clearFilters() {
    reset();
    router.push("/properties");
  }

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-5">
      <Input
        placeholder="City"
        value={city}
        onChange={(e) =>
          setFilters({
            city: e.target.value,
          })
        }
      />

      <Select
        value={categoryId}
        onValueChange={(value) =>
          setFilters({
            categoryId: value,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Property Type" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Min Rent"
        value={minRent}
        onChange={(e) =>
          setFilters({
            minRent: e.target.value,
          })
        }
      />

      <Input
        type="number"
        placeholder="Max Rent"
        value={maxRent}
        onChange={(e) =>
          setFilters({
            maxRent: e.target.value,
          })
        }
      />

      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1">
          Apply
        </Button>

        <Button variant="outline" onClick={clearFilters}>
          Clear
        </Button>
      </div>
    </div>
  );
}
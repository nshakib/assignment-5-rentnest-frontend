"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
}

export function PropertyFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") ?? "");
  const [minRent, setMinRent] = useState(searchParams.get("minRent") ?? "");
  const [maxRent, setMaxRent] = useState(searchParams.get("maxRent") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (categoryId) params.set("categoryId", categoryId);
    if (minRent) params.set("minRent", minRent);
    if (maxRent) params.set("maxRent", maxRent);
    router.push(`/properties?${params.toString()}`);
  }

  function clearFilters() {
    setCity("");
    setCategoryId("");
    setMinRent("");
    setMaxRent("");
    router.push("/properties");
  }

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-5">
      <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />

      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger>
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

      <Input
        placeholder="Min Rent"
        type="number"
        value={minRent}
        onChange={(e) => setMinRent(e.target.value)}
      />
      <Input
        placeholder="Max Rent"
        type="number"
        value={maxRent}
        onChange={(e) => setMaxRent(e.target.value)}
      />

      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1">Apply</Button>
        <Button onClick={clearFilters} variant="outline">Clear</Button>
      </div>
    </div>
  );
}
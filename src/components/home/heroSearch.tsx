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

const tabs = ["Buy", "For Rent", "Sell"] as const;

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Buy");

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-neutral-900 px-4 py-24 text-white sm:px-6 lg:px-8">
      {/* Swap for next/image with a real hero photo/slider later */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-50" />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Buy or rent properties <br className="hidden sm:block" /> with no
          commission
        </h1>

        <div className="mt-10 rounded-xl bg-white p-4 text-neutral-900 shadow-xl sm:p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartments">Apartments</SelectItem>
                <SelectItem value="condos">Condos</SelectItem>
                <SelectItem value="houses">Houses</SelectItem>
                <SelectItem value="villas">Villas</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brooklyn">Brooklyn</SelectItem>
                <SelectItem value="manhattan">Manhattan</SelectItem>
                <SelectItem value="queens">Queens</SelectItem>
              </SelectContent>
            </Select>

            <Input placeholder="Min price" type="number" />

            <Button className="w-full">Search property</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
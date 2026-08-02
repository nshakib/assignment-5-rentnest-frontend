// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const tabs = ["Buy", "For Rent", "Sell"] as const;

// export function HeroSearch() {
//   const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Buy");

//   return (
//     <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-neutral-900 px-4 py-24 text-white sm:px-6 lg:px-8">
//       {/* Swap for next/image with a real hero photo/slider later */}
//       <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-50" />

//       <div className="relative z-10 w-full max-w-4xl text-center">
//         <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
//           Buy or rent properties <br className="hidden sm:block" /> with no
//           commission
//         </h1>

//         <div className="mt-10 rounded-xl bg-white p-4 text-neutral-900 shadow-xl sm:p-6">
//           <div className="mb-4 flex flex-wrap gap-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
//                   activeTab === tab
//                     ? "bg-neutral-900 text-white"
//                     : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             <Select>
//               <SelectTrigger>
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="apartments">Apartments</SelectItem>
//                 <SelectItem value="condos">Condos</SelectItem>
//                 <SelectItem value="houses">Houses</SelectItem>
//                 <SelectItem value="villas">Villas</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select>
//               <SelectTrigger>
//                 <SelectValue placeholder="Location" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="brooklyn">Brooklyn</SelectItem>
//                 <SelectItem value="manhattan">Manhattan</SelectItem>
//                 <SelectItem value="queens">Queens</SelectItem>
//               </SelectContent>
//             </Select>

//             <Input placeholder="Min price" type="number" />

//             <Button className="w-full">Search property</Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


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

const tabs = ["Buy", "For Rent", "Sell"] as const;

interface SearchFormData {
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
}

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Buy");
  const [formData, setFormData] = useState<SearchFormData>({
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    console.log("Searching with:", { activeTab, ...formData });
    // Add your search logic here
  };

  const isSearchDisabled = !formData.category || !formData.location;

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 w-full max-w-5xl text-center">
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Buy or rent properties{" "}
          <br className="hidden sm:block" />
          <span className="text-emerald-400">with no commission</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-300 sm:text-xl">
          Find your perfect home from thousands of listings
        </p>

        {/* Search Box */}
        <div className="mt-10 rounded-2xl bg-white p-5 shadow-2xl sm:p-8">
          {/* Tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-neutral-900 text-white shadow-md"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category */}
            <div className="relative">
              <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartments">Apartments</SelectItem>
                  <SelectItem value="condos">Condos</SelectItem>
                  <SelectItem value="houses">Houses</SelectItem>
                  <SelectItem value="villas">Villas</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Select
                value={formData.location}
                onValueChange={(value) => handleInputChange("location", value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brooklyn">Brooklyn</SelectItem>
                  <SelectItem value="manhattan">Manhattan</SelectItem>
                  <SelectItem value="queens">Queens</SelectItem>
                  <SelectItem value="bronx">Bronx</SelectItem>
                  <SelectItem value="staten-island">Staten Island</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Min Price"
                type="number"
                className="pl-10"
                value={formData.minPrice}
                onChange={(e) => handleInputChange("minPrice", e.target.value)}
              />
            </div>

            {/* Search Button */}
            <Button
              className="w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
              onClick={handleSearch}
              disabled={isSearchDisabled}
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Optional: Max Price Row */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative lg:col-span-3">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Max Price (optional)"
                type="number"
                className="pl-10"
                value={formData.maxPrice}
                onChange={(e) => handleInputChange("maxPrice", e.target.value)}
              />
            </div>
            <div className="hidden lg:block" /> {/* Spacer */}
          </div>
        </div>

        {/* Stats or Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-neutral-300">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">10K+</p>
            <p className="text-sm">Properties</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">5K+</p>
            <p className="text-sm">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">0%</p>
            <p className="text-sm">Commission</p>
          </div>
        </div>
      </div>
    </section>
  );
}
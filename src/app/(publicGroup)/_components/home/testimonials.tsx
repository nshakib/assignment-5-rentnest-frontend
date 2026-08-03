"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Testimonial } from "@/lib/types";
import { fetchTestimonials } from "@/lib/data/testimonials";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then(setTestimonials)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent dark:via-indigo-950/10">
      {/* Section Header */}
      <div className="mb-12 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
            Testimonials
          </Badge>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
          Trusted by Renters & Landlords
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base max-w-2xl mx-auto">
          Real stories from our community of property owners and tenants who found their perfect match.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-dashed">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 py-16 text-center">
          <Quote className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No testimonials available yet</p>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}
          className="w-full group"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full border shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 group/card">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Quote Icon */}
                    <Quote className="h-8 w-8 text-indigo-200 dark:text-indigo-900 mb-4 shrink-0" />

                    {/* Rating Stars (if available) */}
                    {t.rating && (
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < t.rating!
                                ? "fill-amber-400 text-amber-400"
                                : "fill-gray-200 text-gray-200 dark:fill-gray-800 dark:text-gray-800"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Quote Text */}
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed flex-1 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <Avatar className="h-10 w-10 ring-2 ring-indigo-100 dark:ring-indigo-900">
                        <AvatarImage src={t.avatarUrl} alt={t.name} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-xs font-bold">
                          {t.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border-gray-200 dark:border-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all" />
            <div className="text-xs text-muted-foreground font-medium">
              Scroll to explore
            </div>
            <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border-gray-200 dark:border-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all" />
          </div>
        </Carousel>
      )}
    </section>
  );
}
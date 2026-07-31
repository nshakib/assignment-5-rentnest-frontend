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

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
        See what others said about us
      </h2>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem
              key={t.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full rounded-xl border p-6 shadow-sm">
                <p className="mb-6 text-sm text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={t.avatarUrl} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-6 flex justify-center gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
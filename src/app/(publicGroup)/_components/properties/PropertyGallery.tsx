"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
    images: { id: string; imageUrl: string; isPrimary: boolean }[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = images && images.length > 0
    ? images
    : [{ id: "placeholder", imageUrl: "https://fastly.picsum.photos/id/819/800/600.jpg?hmac=N0O_svwWwV9vdGdl62bsfW7MPrwcym4O_IaW4iFPE-g", isPrimary: false }];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={safeImages[activeIndex].imageUrl}
          alt={`${title} — photo ${activeIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Thumbnail strip — only show if more than 1 image */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                index === activeIndex ? "border-primary" : "border-transparent"
              )}
              aria-label={`View photo ${index + 1}`}
            >
              <Image
                src={image.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
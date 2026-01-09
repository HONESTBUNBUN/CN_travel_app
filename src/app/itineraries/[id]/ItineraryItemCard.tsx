import Image from "next/image";
import type { ItineraryItem } from "@/types/itinerary";
import { CategoryBadge } from "./CategoryBadge";

interface ItineraryItemCardProps {
  item: ItineraryItem;
}

export function ItineraryItemCard({ item }: ItineraryItemCardProps) {
  return (
    <div className="flex gap-[16px]">
      {/* Thumbnail */}
      <div className="relative h-[97px] w-[97px] flex-shrink-0 overflow-hidden rounded-[10px] bg-neutral-200">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8C909A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-[6px]">
        {/* Category Badge */}
        <CategoryBadge category={item.category} />

        {/* Title with ordered list number */}
        <ol
          start={item.order}
          className="list-decimal pl-[20px] marker:font-body marker:text-[16px] marker:font-bold marker:text-primary-dark"
        >
          <li>
            <span className="font-body text-[16px] font-bold leading-[1.3] text-primary-dark">
              {item.title}
            </span>
          </li>
        </ol>

        {/* Description */}
        <p className="font-body text-[12px] leading-[18px] text-[#4a5565]">
          {item.shortDescription}
        </p>
      </div>
    </div>
  );
}

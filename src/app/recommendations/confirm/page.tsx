"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";

export default function ConfirmRecommendationsPage() {
  const router = useRouter();
  const { recommendations } = useAppStore();

  // Redirect if no interested destinations
  if (recommendations.interestedDestinations.length === 0) {
    router.push("/recommendations");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar with Back Button */}
      <div className="flex h-[54px] items-center px-lg py-xs">
        <button
          onClick={() => router.back()}
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-neutral-200"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-900"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-lg py-md">
        {/* Route icon - 80px rounded square with gray background */}
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-[24px] bg-neutral-100">
          {/* Route/path icon with connected circles */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="19" r="3" />
            <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
            <circle cx="18" cy="5" r="3" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="max-w-sm text-center font-heading text-[24px] font-bold leading-[1.2] text-primary-dark">
          Want to see how these places could fit into one trip?
        </h1>

        {/* Body text */}
        <p className="max-w-[321px] text-center font-body text-[16px] leading-[1.3] text-neutral-700">
          We'll suggest a few realistic ways to combine your selected places into a first China itinerary.
        </p>
      </div>

      {/* Bottom buttons with 15px gap */}
      <div className="flex flex-col gap-[15px] px-lg py-xl">
        <Button size="lg" onClick={() => router.push("/itineraries")}>
          Show possible itineraries
        </Button>
        <Button size="lg" variant="secondary" onClick={() => router.push("/recommendations")}>
          Not now
        </Button>
      </div>
    </div>
  );
}

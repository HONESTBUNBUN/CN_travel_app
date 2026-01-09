"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { mockDestinations } from "@/data/mockDestinations";
import { generateItineraries } from "@/lib/itineraryGenerator";
import type { ItineraryPlan } from "@/types/itinerary";

export default function ItinerariesPage() {
  const router = useRouter();
  const { onboarding, recommendations, resetApp, setGeneratedItineraries } = useAppStore();
  const [itineraries, setItineraries] = useState<ItineraryPlan[]>([]);
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    // Get interested destinations
    const interestedDests = mockDestinations.filter((d) =>
      recommendations.interestedDestinations.includes(d.id)
    );

    if (interestedDests.length === 0) {
      router.push("/recommendations");
      return;
    }

    // Generate itineraries
    const result = generateItineraries(interestedDests, onboarding.inputs);
    setItineraries(result.itineraries);
    setMessage(result.message);
    // Store in global state so detail page can access them
    setGeneratedItineraries(result.itineraries);
  }, [recommendations.interestedDestinations, onboarding.inputs, router, setGeneratedItineraries]);

  if (itineraries.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-lg">
        <div className="max-w-md text-center">
          <h1 className="mb-4 font-heading text-heading-4 text-primary-dark">
            No itineraries available
          </h1>
          <p className="mb-8 font-body text-body-2 text-primary-gray">
            {message || "Please select at least 2 destinations to generate itinerary plans."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="flex h-[54px] items-center gap-md px-lg py-xs">
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
        <div className="flex-1 pr-9 text-center">
          <h1 className="font-heading text-[16px] font-semibold text-primary-dark">
            Possible Plans
          </h1>
        </div>
      </div>

      {/* Itinerary Cards */}
      <div className="px-lg py-md">
        <div className="flex flex-col gap-xs">
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>

        {message && (
          <p className="mt-4 font-body text-body-3 text-primary-gray">
            {message}
          </p>
        )}
      </div>

      {/* Bottom Bar with Restart Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white from-[77%] to-transparent px-lg py-xl">
        <button
          onClick={() => {
            if (confirm("Start over? This will reset all your selections.")) {
              resetApp();
              router.push("/");
            }
          }}
          className="w-full rounded-full bg-primary-dark px-md py-sm font-body text-body-2 text-neutral-100"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

function ItineraryCard({ itinerary }: { itinerary: ItineraryPlan }) {
  // Format route for display
  const routeText = itinerary.route
    .map((segment) => segment.destinationName)
    .join(" → ");

  return (
    <div className="rounded-card bg-white p-md shadow-card">
      <div className="mb-xs flex items-center justify-between">
        <h2 className="font-body text-body-1 text-primary-dark">
          {itinerary.name}
        </h2>
        <div className="flex items-center gap-[6px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" stroke="#8C909A" strokeWidth="1.5" />
            <path
              d="M8 4V8L10.5 10.5"
              stroke="#8C909A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-body text-body-3 text-neutral-500">
            {itinerary.totalDays} days
          </span>
        </div>
      </div>

      <p className="mb-2 font-body text-body-2 text-neutral-800">
        {routeText}
      </p>

      <p className="mb-xs font-body text-body-4 text-neutral-700">
        {itinerary.tagline}
      </p>

      <Link
        href={`/itineraries/${itinerary.id}`}
        className="mt-xs flex items-center gap-[5px] rounded-full py-xs font-body text-body-3 text-neutral-800"
      >
        View Itinerary
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 5L13 10L8 15"
            stroke="#464E5D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

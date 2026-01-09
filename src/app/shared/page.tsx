"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SharedItinerary {
  id: string;
  name: string;
  tagline: string;
  totalDays: number;
  route: {
    destinationName: string;
    nights: number;
    days: {
      dayNumber: number;
      theme: string;
      intent: string;
      items: string[];
      pace: "light" | "moderate" | "packed";
    }[];
    nextTransport?: {
      method: string;
      duration: string;
    };
  }[];
  scope: "overview" | "full";
}

export default function SharedItineraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState<SharedItinerary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = searchParams.get("data");

      if (!data) {
        setError("No itinerary data found in URL");
        return;
      }

      // Decode the base64 encoded data
      const decoded = atob(data);
      const parsed: SharedItinerary = JSON.parse(decoded);

      setItinerary(parsed);
    } catch (err) {
      console.error("Failed to decode itinerary:", err);
      setError("Invalid or corrupted share link");
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-lg">
        <div className="max-w-md text-center">
          <div className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-red-100 mx-auto">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="mb-4 font-heading text-heading-4 text-primary-dark">
            Unable to load itinerary
          </h1>
          <p className="mb-8 font-body text-body-2 text-primary-gray">
            {error}
          </p>
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-primary-dark px-6 py-3 font-body text-body-2 text-neutral-0"
          >
            Go to homepage
          </button>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-body text-body-2 text-primary-gray">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="flex h-[54px] items-center gap-md px-lg py-xs border-b border-neutral-200">
        <div className="flex-1 text-center">
          <h1 className="font-heading text-[16px] font-semibold text-primary-dark">
            {itinerary.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-lg py-md">
        {/* Header */}
        <div className="mb-6">
          <h2 className="mb-2 font-heading text-[24px] font-semibold text-primary-dark">
            {itinerary.name}
          </h2>
          <p className="mb-4 font-body text-body-2 text-neutral-700">
            {itinerary.tagline}
          </p>
          <div className="flex items-center gap-2">
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

        {/* Route Overview */}
        <div className="mb-6 rounded-lg bg-neutral-100 p-4">
          <h3 className="mb-3 font-body text-[16px] font-medium text-neutral-700">
            Route
          </h3>
          <p className="font-body text-body-2 text-neutral-800">
            {itinerary.route.map(s => s.destinationName).join(" → ")}
          </p>
        </div>

        {/* Full itinerary details (if scope is "full") */}
        {itinerary.scope === "full" && (
          <div className="space-y-6">
            <h3 className="font-body text-[18px] font-semibold text-primary-dark">
              Day-by-day itinerary
            </h3>

            {itinerary.route.map((segment, segmentIdx) => (
              <div key={segmentIdx} className="space-y-4">
                {/* Destination Header */}
                <div className="rounded-lg bg-primary-dark/5 p-4">
                  <h4 className="font-body text-[16px] font-semibold text-primary-dark">
                    {segment.destinationName} ({segment.nights} nights)
                  </h4>
                </div>

                {/* Days */}
                {segment.days.map((day, dayIdx) => (
                  <div key={dayIdx} className="ml-4 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark/10 font-body text-[12px] font-medium text-primary-dark mt-1">
                        {day.dayNumber}
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-body-2 font-semibold text-primary-dark">
                          {day.theme}
                        </p>
                        <p className="mt-1 font-body text-body-3 text-neutral-700">
                          {day.intent}
                        </p>

                        {/* Activities */}
                        <ul className="mt-2 space-y-1">
                          {day.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="font-body text-body-4 text-neutral-700"
                            >
                              • {item}
                            </li>
                          ))}
                        </ul>

                        {/* Pace indicator */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-body text-[12px] text-neutral-600">
                            Pace:
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 font-body text-[11px] ${
                              day.pace === "light"
                                ? "bg-green-100 text-green-700"
                                : day.pace === "moderate"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {day.pace.charAt(0).toUpperCase() + day.pace.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Transport to next destination */}
                {segment.nextTransport && (
                  <div className="ml-4 flex items-center gap-2 text-neutral-600">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      {segment.nextTransport.method === "flight" ? (
                        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                      ) : (
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                      )}
                    </svg>
                    <span className="font-body text-body-4">
                      {segment.nextTransport.duration} {segment.nextTransport.method}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Branding footer */}
        <div className="mt-8 border-t border-neutral-200 pt-6 text-center">
          <p className="font-body text-body-4 text-neutral-600">
            Created with CN Travel App
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 rounded-full bg-primary-dark px-6 py-2 font-body text-body-3 text-neutral-0"
          >
            Create your own itinerary
          </button>
        </div>
      </div>
    </div>
  );
}

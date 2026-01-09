"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import type { ItineraryPlan, DayPlan } from "@/types/itinerary";
import { ShareSheet } from "./ShareSheet";
import { ItineraryItemCard } from "./ItineraryItemCard";
import { ConnectionIndicator } from "./ConnectionIndicator";

export default function ItineraryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { generatedItineraries } = useAppStore();
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | number>("overview");
  const [showShareSheet, setShowShareSheet] = useState(false);

  useEffect(() => {
    console.log('[ItineraryDetail] Effect running, params.id:', params.id);
    console.log('[ItineraryDetail] Stored itineraries:', generatedItineraries.length);

    // Find the itinerary from stored generated itineraries
    const found = generatedItineraries.find((i) => i.id === params.id);
    console.log('[ItineraryDetail] Found itinerary:', !!found);

    if (found) {
      setItinerary(found);
    } else {
      console.log('[ItineraryDetail] No matching itinerary, redirecting...');
      router.push("/itineraries");
    }
  }, [params.id, generatedItineraries, router]);

  if (!itinerary) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-body text-body-2 text-primary-gray">Loading...</p>
      </div>
    );
  }

  // Get all days across all segments
  const allDays: DayPlan[] = [];
  itinerary.route.forEach((segment) => {
    allDays.push(...segment.days);
  });

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
            {itinerary.name}
          </h1>
        </div>
        <button
          className="flex h-[32px] w-[32px] items-center justify-center"
          onClick={() => setShowShareSheet(true)}
          aria-label="Share itinerary"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-900"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-200 px-lg">
        <div className="flex gap-md overflow-x-auto">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </TabButton>
          {allDays.map((day, index) => (
            <TabButton
              key={`day-${day.dayNumber}-${index}`}
              active={activeTab === day.dayNumber}
              onClick={() => setActiveTab(day.dayNumber)}
            >
              Day {day.dayNumber}
            </TabButton>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-lg py-md pb-24">
        {activeTab === "overview" ? (
          <OverviewView itinerary={itinerary} />
        ) : (
          <DayView
            day={allDays.find((d) => d.dayNumber === activeTab)!}
            itinerary={itinerary}
          />
        )}
      </div>

      {/* Share Bottom Sheet */}
      {showShareSheet && (
        <ShareSheet
          itinerary={itinerary}
          onClose={() => setShowShareSheet(false)}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap border-b-2 py-3 font-body text-[14px] transition-colors ${
        active
          ? "border-primary-dark font-medium text-primary-dark"
          : "border-transparent text-neutral-500"
      }`}
    >
      {children}
    </button>
  );
}

function OverviewView({ itinerary }: { itinerary: ItineraryPlan }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-4 font-heading text-[24px] font-semibold text-primary-dark">
          Overview
        </h2>
        <div className="mb-4 flex items-center gap-2">
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
        <p className="font-body text-body-2 leading-relaxed text-neutral-700">
          {itinerary.tagline}
        </p>
      </div>

      {/* Route Breakdown */}
      <div>
        <h3 className="mb-4 font-body text-[16px] font-medium text-neutral-700">
          Route breakdown
        </h3>
        <div className="space-y-4">
          {itinerary.route.map((segment, index) => (
            <div key={segment.destinationId}>
              {/* Destination */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark/10">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#182235"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  {index < itinerary.route.length - 1 && (
                    <div className="my-1 h-8 w-px bg-neutral-300" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h4 className="mb-1 font-body text-body-2 font-medium text-primary-dark">
                    {segment.destinationName} — {segment.nights} days
                  </h4>
                  <p className="font-body text-body-4 text-neutral-700">
                    {segment.days[0]?.intent || "Explore the city"}
                  </p>
                </div>
              </div>

              {/* Transport to next */}
              {segment.nextTransport && (
                <div className="ml-3 flex gap-3 py-2">
                  <div className="flex h-6 w-6 items-center justify-center">
                    {segment.nextTransport.method === "flight" ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8C909A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8C909A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M9 9h6M9 15h6" />
                      </svg>
                    )}
                  </div>
                  <p className="font-body text-body-4 text-neutral-500">
                    {itinerary.route[index + 1]?.destinationName &&
                      `${segment.destinationName} to ${
                        itinerary.route[index + 1].destinationName
                      }: ${segment.nextTransport.duration} ${segment.nextTransport.method.replace("-", " ")}`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tradeoffs */}
      {itinerary.tradeoffs.length > 0 && (
        <div className="rounded-lg bg-neutral-100 p-4">
          <h3 className="mb-2 font-body text-[14px] font-medium text-neutral-800">
            Good to know
          </h3>
          <ul className="space-y-1">
            {itinerary.tradeoffs.map((tradeoff, index) => (
              <li
                key={index}
                className="font-body text-body-4 text-neutral-700"
              >
                • {tradeoff}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DayView({
  day,
  itinerary,
}: {
  day: DayPlan;
  itinerary: ItineraryPlan;
}) {
  // Find which segment this day belongs to
  const segment = itinerary.route.find((s) =>
    s.days.some((d) => d.dayNumber === day.dayNumber)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-2 font-heading text-[24px] font-semibold text-primary-dark">
          Day {day.dayNumber} - {segment?.destinationName}
        </h2>
        <p className="mb-4 font-body text-body-2 text-neutral-800">
          {day.theme}
        </p>
        <p className="font-body text-body-3 text-neutral-700">
          {day.intent}
        </p>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {day.structuredItems && day.structuredItems.length > 0 ? (
          // Render structured items with category badges and connections
          <div className="space-y-0">
            {day.structuredItems.map((item, index) => (
              <div key={item.order}>
                <ItineraryItemCard item={item} />
                {item.connection && index < day.structuredItems!.length - 1 && (
                  <ConnectionIndicator connection={item.connection} />
                )}
              </div>
            ))}
          </div>
        ) : (
          // Fallback to plain text items
          <>
            {day.items.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark/10 font-body text-[12px] font-medium text-primary-dark">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-body text-body-2 text-neutral-800">{item}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Pace indicator */}
      <div className="rounded-lg bg-neutral-100 p-4">
        <div className="flex items-center gap-2">
          <span className="font-body text-body-4 font-medium text-neutral-700">
            Pace:
          </span>
          <span
            className={`rounded-full px-3 py-1 font-body text-[12px] ${
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
        {day.notes && (
          <p className="mt-2 font-body text-body-4 text-neutral-700">
            {day.notes}
          </p>
        )}
      </div>
    </div>
  );
}

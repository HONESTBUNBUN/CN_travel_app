"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";
import { getRecommendedDestinations } from "@/lib/recommendations";
import type { Destination } from "@/types";
import Image from "next/image";

export default function RecommendationsPage() {
  const router = useRouter();
  const { onboarding, recommendations, markDestinationInterested, skipDestination, nextDestination } = useAppStore();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [relaxedFilter, setRelaxedFilter] = useState(false);
  const [filterMessage, setFilterMessage] = useState<string | undefined>();
  const [imageError, setImageError] = useState(false);
  const [detailImageError, setDetailImageError] = useState(false);

  useEffect(() => {
    // Get customized recommendations based on user inputs
    const result = getRecommendedDestinations(onboarding.inputs);
    console.log('[Recommendations] Generated destinations:', result.destinations.length);
    console.log('[Recommendations] Current index:', recommendations.currentDestinationIndex);
    console.log('[Recommendations] Onboarding inputs:', onboarding.inputs);
    setDestinations(result.destinations);
    setRelaxedFilter(result.relaxedFilter);
    setFilterMessage(result.message);

    // Redirect if no inputs
    if (!onboarding.inputs.interests || onboarding.inputs.interests.length === 0) {
      router.push("/onboarding/q1");
    }
  }, [onboarding.inputs, router]);

  // Reset image errors when destination changes
  useEffect(() => {
    setImageError(false);
    setDetailImageError(false);
  }, [recommendations.currentDestinationIndex]);

  const currentDestination = destinations[recommendations.currentDestinationIndex];

  // Temporary logging for debug (as requested by user)
  useEffect(() => {
    if (currentDestination) {
      console.log('[DEBUG] Current destination:', currentDestination.id);
      console.log('[DEBUG] Resolved image URL:', currentDestination.heroImage);
    }
  }, [currentDestination]);

  // All destinations viewed - Show confirmation screen
  if (!currentDestination) {
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
        <div className="flex flex-1 flex-col items-center justify-center px-lg py-md">
          {/* Green checkmark icon */}
          <div
            className="mb-8 flex h-[100px] w-[100px] items-center justify-center rounded-full"
            style={{ backgroundColor: '#84ebB4' }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-center font-heading text-[18px] font-semibold text-primary-dark">
            All destinations reviewed
          </h1>

          {/* Subheading with count */}
          <p className="text-center font-body text-[14px] leading-[1.3] text-neutral-700">
            You're interested in {recommendations.interestedDestinations.length} destinations.
          </p>
        </div>

        {/* Bottom button */}
        <div className="px-lg py-xl">
          <Button
            size="lg"
            onClick={() => router.push("/recommendations/confirm")}
          >
            Continue to trip planning
          </Button>
        </div>
      </div>
    );
  }

  const handleSkip = () => {
    skipDestination(currentDestination.id);
    nextDestination();
  };

  const handleInterested = () => {
    markDestinationInterested(currentDestination.id);
    nextDestination();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="px-lg py-md">
        <p className="font-body text-body-4 text-text-tertiary">
          {recommendations.currentDestinationIndex + 1} of {destinations.length}
        </p>
        <h1 className="mt-1 font-heading text-heading-4 text-primary-dark">
          Destinations for you
        </h1>
        {filterMessage && (
          <p className="mt-2 font-body text-body-3 text-primary-gray">
            {filterMessage}
          </p>
        )}
      </div>

      {/* Destination Card */}
      <div className="flex flex-1 items-center justify-center px-lg">
        <div className="w-full max-w-sm">
          <div
            className="overflow-hidden rounded-card bg-white shadow-card cursor-pointer"
            onClick={() => setShowDetail(true)}
          >
            {/* Hero Image */}
            <div className="relative h-64 w-full">
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                  <p className="text-neutral-500 text-sm">Image unavailable</p>
                </div>
              )}
              <Image
                src={currentDestination.heroImage}
                alt={currentDestination.name}
                fill
                className="object-cover"
                unoptimized
                onError={() => setImageError(true)}
                priority={true}
              />
            </div>

            {/* Content */}
            <div className="p-md">
              <h2 className="mb-2 font-heading text-2xl font-bold text-primary-dark">
                {currentDestination.name}
              </h2>

              {/* Tags */}
              <div className="mb-3 flex flex-wrap gap-xs">
                {currentDestination.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-200 px-3 py-1 font-body text-body-4 text-neutral-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mb-4 font-body text-body-2 text-primary-gray">
                {currentDestination.shortDescription}
              </p>

              {/* Hint */}
              <p className="font-body text-body-4 italic text-text-tertiary">
                Tap to learn why this fits your trip
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <Button variant="secondary" size="lg" onClick={handleSkip} className="flex-1">
              Skip
            </Button>
            <Button size="lg" onClick={handleInterested} className="flex-1">
              Interested
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Sheet (Simple version for now) */}
      {showDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-[24px] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image */}
            <div className="relative h-[28vh] w-full">
              {detailImageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                  <p className="text-neutral-500 text-sm">Image unavailable</p>
                </div>
              )}
              <Image
                src={currentDestination.heroImage}
                alt={currentDestination.name}
                fill
                className="object-cover"
                unoptimized
                onError={() => setDetailImageError(true)}
                priority={true}
              />
            </div>

            {/* Content */}
            <div className="space-y-6 px-lg py-lg">
              <h1 className="font-heading text-3xl font-bold text-primary-dark">
                {currentDestination.name}
              </h1>

              {/* Why people like this */}
              <section>
                <h2 className="mb-2 font-heading text-lg font-semibold text-primary-dark">
                  Why people like this place
                </h2>
                <p className="font-body text-body-2 text-neutral-900">
                  {currentDestination.whyPeopleLike}
                </p>
              </section>

              {/* Best time to visit */}
              <section>
                <h2 className="mb-2 font-heading text-lg font-semibold text-primary-dark">
                  Best time to visit
                </h2>
                <p className="font-body text-body-2 text-neutral-900">
                  {currentDestination.bestTimeToVisit.explanation}
                </p>
              </section>

              {/* Why this fits YOUR trip */}
              <section className="rounded-lg bg-blue-50 p-4">
                <h2 className="mb-2 font-heading text-lg font-semibold text-blue-900">
                  Why this fits your trip
                </h2>
                <p className="font-body text-body-2 text-gray-800">
                  {currentDestination.whyThisFits(onboarding.inputs as any)}
                </p>
              </section>

              {/* Good to know */}
              <section>
                <h2 className="mb-2 font-heading text-lg font-semibold text-primary-dark">
                  Good to know
                </h2>
                <ul className="space-y-2">
                  {currentDestination.goodToKnow.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-body text-body-2 text-neutral-900">
                      <span className="mt-1 text-amber-600">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="sticky bottom-0 flex gap-3 border-t border-neutral-200 bg-white px-lg py-4">
              <Button variant="secondary" size="lg" onClick={() => setShowDetail(false)} className="flex-1">
                Back
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  handleInterested();
                  setShowDetail(false);
                }}
                className="flex-1"
              >
                Add to my trip
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

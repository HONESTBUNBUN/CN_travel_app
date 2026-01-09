"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/ui/TopBar";
import { useAppStore } from "@/store/useAppStore";

export default function Question3() {
  const router = useRouter();
  const { updateUserInputs, completeStep } = useAppStore();
  const [tripLength, setTripLength] = useState<number>(10);

  const handleNext = () => {
    if (tripLength < 3 || tripLength > 30) {
      alert("Please select a trip length between 3 and 30 days");
      return;
    }
    updateUserInputs({ tripLength });
    completeStep(3);
    router.push("/onboarding/q4");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar with Progress */}
      <TopBar showProgress currentStep={3} totalSteps={6} />

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-lg py-md">
        <div className="flex flex-1 flex-col gap-lg">
          {/* Question */}
          <div className="flex items-center">
            <h1 className="font-heading text-heading-4 text-primary-dark">
              How many days do you have for this trip?
            </h1>
          </div>

          {/* Picker */}
          <div className="flex flex-1 flex-col items-center justify-center gap-lg">
            {/* Simple number input (can be enhanced with wheel picker later) */}
            <div className="flex flex-col items-center gap-md">
              <div className="flex items-center gap-md">
                <button
                  onClick={() => setTripLength(Math.max(3, tripLength - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-900 transition-colors hover:bg-neutral-400/50"
                >
                  −
                </button>
                <div className="flex w-24 flex-col items-center">
                  <span className="text-6xl font-bold text-primary-dark">
                    {tripLength}
                  </span>
                  <span className="text-sm text-primary-gray">days</span>
                </div>
                <button
                  onClick={() => setTripLength(Math.min(30, tripLength + 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-900 transition-colors hover:bg-neutral-400/50"
                >
                  +
                </button>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                value={tripLength}
                onChange={(e) => setTripLength(Number(e.target.value))}
                className="w-full max-w-xs"
              />
              <p className="text-sm text-text-tertiary">
                3 to 30 days
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="flex flex-col px-lg py-xl">
        <Button size="lg" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}

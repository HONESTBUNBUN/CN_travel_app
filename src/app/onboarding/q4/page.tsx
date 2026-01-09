"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/ui/TopBar";
import { useAppStore } from "@/store/useAppStore";
import type { TravelPace } from "@/types";

const PACE_OPTIONS: { value: TravelPace; label: string; description: string }[] = [
  {
    value: "slow",
    label: "Slow",
    description: "3-4 nights per city, lots of downtime",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "2-3 nights per city, mix of activity and rest",
  },
  {
    value: "fast",
    label: "Fast",
    description: "1-2 nights per city, see as much as possible",
  },
];

export default function Question4() {
  const router = useRouter();
  const { updateUserInputs, completeStep } = useAppStore();
  const [selected, setSelected] = useState<TravelPace | null>(null);

  const handleNext = () => {
    if (!selected) {
      alert("Please select a travel pace");
      return;
    }
    updateUserInputs({ pace: selected });
    completeStep(4);
    router.push("/onboarding/q5");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar with Progress */}
      <TopBar showProgress currentStep={4} totalSteps={6} />

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-lg py-md">
        <div className="flex flex-1 flex-col gap-lg">
          {/* Question */}
          <div className="flex items-center">
            <h1 className="font-heading text-heading-4 text-primary-dark">
              What kind of pace do you prefer?
            </h1>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-sm">
            {PACE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelected(option.value)}
                className={`flex flex-col gap-1 rounded-card border-2 p-md text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                  selected === option.value
                    ? "border-primary-dark bg-primary-dark/5"
                    : "border-neutral-200 bg-neutral-0 hover:border-neutral-400"
                }`}
              >
                <p className="font-body text-body-2 font-semibold text-neutral-900">
                  {option.label}
                </p>
                <p className="font-body text-body-4 text-primary-gray">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="flex flex-col px-lg py-xl">
        <Button size="lg" onClick={handleNext} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}

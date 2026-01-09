"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/ui/TopBar";
import { useAppStore } from "@/store/useAppStore";
import type { WeatherFlexibility } from "@/types";

const FLEXIBILITY_OPTIONS: { value: WeatherFlexibility; label: string; description: string }[] = [
  {
    value: "flexible",
    label: "Flexible",
    description: "I can travel any time and handle any weather",
  },
  {
    value: "somewhat",
    label: "Somewhat flexible",
    description: "I prefer good weather but can adapt",
  },
  {
    value: "comfort-focused",
    label: "Comfort-focused",
    description: "I want pleasant weather and fewer crowds",
  },
];

export default function Question6() {
  const router = useRouter();
  const { updateUserInputs, completeStep, resetRecommendations } = useAppStore();
  const [selected, setSelected] = useState<WeatherFlexibility | null>(null);

  const handleNext = () => {
    if (!selected) {
      alert("Please select your flexibility level");
      return;
    }
    updateUserInputs({ weatherFlexibility: selected });
    completeStep(6);
    // Reset recommendations so user starts from destination index 0
    resetRecommendations();
    router.push("/recommendations");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar showProgress currentStep={6} totalSteps={6} />

      <main className="flex flex-1 flex-col px-lg py-md">
        <div className="flex flex-1 flex-col gap-lg">
          <div className="flex flex-col gap-sm">
            <h1 className="font-heading text-heading-4 text-primary-dark">
              How flexible are you with weather and crowds?
            </h1>
          </div>

          <div className="flex flex-col gap-sm">
            {FLEXIBILITY_OPTIONS.map((option) => (
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

      <div className="flex flex-col px-lg py-xl">
        <Button size="lg" onClick={handleNext} disabled={!selected}>
          See recommendations
        </Button>
      </div>
    </div>
  );
}

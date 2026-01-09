"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/ui/TopBar";
import { useAppStore } from "@/store/useAppStore";
import type { PlanningEffort } from "@/types";

const EFFORT_OPTIONS: { value: PlanningEffort; label: string; description: string }[] = [
  {
    value: "low",
    label: "Low",
    description: "I want clear recommendations with minimal research",
  },
  {
    value: "medium",
    label: "Medium",
    description: "I'll do some research but want strong guidance",
  },
  {
    value: "high",
    label: "High",
    description: "I enjoy researching and planning details myself",
  },
];

export default function Question5() {
  const router = useRouter();
  const { updateUserInputs, completeStep } = useAppStore();
  const [selected, setSelected] = useState<PlanningEffort | null>(null);

  const handleNext = () => {
    if (!selected) {
      alert("Please select your planning effort level");
      return;
    }
    updateUserInputs({ planningEffort: selected });
    completeStep(5);
    router.push("/onboarding/q6");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar showProgress currentStep={5} totalSteps={6} />

      <main className="flex flex-1 flex-col px-lg py-md">
        <div className="flex flex-1 flex-col gap-lg">
          <div className="flex flex-col gap-sm">
            <h1 className="font-heading text-heading-4 text-primary-dark">
              For places you really want to see, how much effort do you want to put into planning?
            </h1>
          </div>

          <div className="flex flex-col gap-sm">
            {EFFORT_OPTIONS.map((option) => (
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
          Continue
        </Button>
      </div>
    </div>
  );
}

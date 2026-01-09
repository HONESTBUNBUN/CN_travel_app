"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { TopBar } from "@/components/ui/TopBar";
import { useAppStore } from "@/store/useAppStore";
import { INTERESTS } from "@/types";

export default function Question2() {
  const router = useRouter();
  const { updateUserInputs, completeStep } = useAppStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      if (selected.length >= 5) {
        return; // Max 5 selections
      }
      setSelected([...selected, id]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) {
      alert("Please select at least one interest");
      return;
    }
    updateUserInputs({ interests: selected });
    completeStep(2);
    router.push("/onboarding/q3");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar with Progress */}
      <TopBar showProgress currentStep={2} totalSteps={6} />

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-lg py-md">
        <div className="flex flex-1 flex-col gap-lg">
          {/* Question */}
          <div className="flex flex-col gap-sm">
            <h1 className="font-heading text-heading-4 text-primary-dark">
              What are you curious about in China?
            </h1>
            <p className="font-body text-body-2 text-primary-gray">
              Choose up to 5 things that really excite you.
            </p>
          </div>

          {/* Interest Pills */}
          <div className="flex flex-col gap-sm">
            {/* Row 1 */}
            <div className="flex flex-wrap gap-xs">
              {INTERESTS.slice(0, 2).map((interest) => (
                <Pill
                  key={interest.id}
                  label={interest.label}
                  emoji={interest.emoji}
                  selected={selected.includes(interest.id)}
                  onClick={() => toggleInterest(interest.id)}
                />
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-xs">
              {INTERESTS.slice(2, 4).map((interest) => (
                <Pill
                  key={interest.id}
                  label={interest.label}
                  emoji={interest.emoji}
                  selected={selected.includes(interest.id)}
                  onClick={() => toggleInterest(interest.id)}
                />
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex flex-wrap gap-xs">
              {INTERESTS.slice(4, 6).map((interest) => (
                <Pill
                  key={interest.id}
                  label={interest.label}
                  emoji={interest.emoji}
                  selected={selected.includes(interest.id)}
                  onClick={() => toggleInterest(interest.id)}
                />
              ))}
            </div>

            {/* Row 4 */}
            <div className="flex flex-wrap gap-xs">
              {INTERESTS.slice(6, 8).map((interest) => (
                <Pill
                  key={interest.id}
                  label={interest.label}
                  emoji={interest.emoji}
                  selected={selected.includes(interest.id)}
                  onClick={() => toggleInterest(interest.id)}
                />
              ))}
            </div>

            {/* Row 5 */}
            <div className="flex flex-wrap gap-xs">
              {INTERESTS.slice(8, 10).map((interest) => (
                <Pill
                  key={interest.id}
                  label={interest.label}
                  emoji={interest.emoji}
                  selected={selected.includes(interest.id)}
                  onClick={() => toggleInterest(interest.id)}
                />
              ))}
            </div>

            {/* Row 6 */}
            <div className="flex flex-wrap gap-xs">
              {INTERESTS.slice(10, 12).map((interest) => (
                <Pill
                  key={interest.id}
                  label={interest.label}
                  emoji={interest.emoji}
                  selected={selected.includes(interest.id)}
                  onClick={() => toggleInterest(interest.id)}
                />
              ))}
            </div>
          </div>

          {/* Counter */}
          <p className="text-center font-body text-body-4 text-text-tertiary">
            {selected.length} / 5 selected
          </p>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="flex flex-col px-lg py-xl">
        <Button size="lg" onClick={handleNext} disabled={selected.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}

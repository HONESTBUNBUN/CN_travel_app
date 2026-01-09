"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/ui/TopBar";
import { useAppStore } from "@/store/useAppStore";

export default function Question1() {
  const router = useRouter();
  const { updateUserInputs, completeStep } = useAppStore();

  const handleAnswer = (isFirstTimer: boolean) => {
    if (!isFirstTimer) {
      // User selects "No" - show message and redirect
      alert(
        "This tool is designed for first-time visitors. We may expand support in the future!"
      );
      router.push("/");
      return;
    }

    // Update state and move to next question
    updateUserInputs({ isFirstTimer: true });
    completeStep(1);
    router.push("/onboarding/q2");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar with Progress */}
      <TopBar showProgress currentStep={1} totalSteps={6} />

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-lg py-md">
        <div className="flex flex-1 flex-col gap-lg">
          {/* Question */}
          <div className="flex items-center">
            <h1 className="font-heading text-heading-4 text-primary-dark">
              Is this your first time visiting China?
            </h1>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-lg">
            {/* Option 1: Yes */}
            <button
              onClick={() => handleAnswer(true)}
              className="flex gap-2 rounded-card border-2 border-neutral-200 bg-neutral-0 p-md text-left transition-colors hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
            >
              <div className="flex flex-col gap-1">
                <p className="font-body text-body-2 text-neutral-900">
                  Yes, this is my first time
                </p>
              </div>
            </button>

            {/* Option 2: No (Disabled) */}
            <button
              onClick={() => handleAnswer(false)}
              className="flex gap-2 rounded-card border-2 border-neutral-200 bg-neutral-100 p-md text-left opacity-50"
            >
              <div className="flex flex-col gap-1">
                <p className="font-body text-body-2 text-neutral-500">
                  No, I have been to China before
                </p>
                <p className="font-body text-body-4 text-neutral-500">
                  Coming soon
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="flex flex-col px-lg py-xl">
        <Button size="lg" disabled>
          Continue
        </Button>
      </div>
    </div>
  );
}

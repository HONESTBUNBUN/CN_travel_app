"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";

interface TopBarProps {
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
  className?: string;
}

export function TopBar({
  showProgress = false,
  currentStep = 1,
  totalSteps = 6,
  onBack,
  className,
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "flex h-[54px] items-center gap-md px-lg py-xs",
        className
      )}
    >
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-neutral-200 transition-colors hover:bg-neutral-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
        aria-label="Go back"
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

      {/* Progress Bar */}
      {showProgress && (
        <ProgressBar current={currentStep} total={totalSteps} />
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div
      className={cn("relative h-[6.4px] w-full max-w-[225.6px] overflow-hidden rounded-[32px] bg-neutral-100", className)}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-[32px] bg-neutral-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

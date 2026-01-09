import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  label: string;
  emoji?: string;
}

const Pill = forwardRef<HTMLButtonElement, PillProps>(
  ({ className, selected = false, label, emoji, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-full border-2 px-md py-sm",
          "font-body text-body-2 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

          // State styles
          {
            // Default state
            "bg-neutral-0 border-neutral-200 text-neutral-900 hover:border-neutral-400":
              !selected && !disabled,

            // Selected state
            "bg-primary-dark border-primary-dark text-white hover:bg-primary-dark/90":
              selected && !disabled,

            // Disabled state
            "bg-neutral-100 border-neutral-200 opacity-50 pointer-events-none":
              disabled,
          },

          className
        )}
        {...props}
      >
        {emoji && <span className="mr-1">{emoji}</span>}
        <span className="text-nowrap">{label}</span>
      </button>
    );
  }
);

Pill.displayName = "Pill";

export { Pill };

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-full font-body text-body-2 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",

          // Variant styles
          {
            // Primary button (dark background, white text)
            "bg-primary-dark text-white hover:bg-primary-dark/90 focus-visible:ring-primary-dark":
              variant === "primary" && !disabled,
            "bg-neutral-200 text-neutral-400": variant === "primary" && disabled,

            // Secondary button (light background, dark text)
            "bg-neutral-0 text-neutral-900 border-2 border-neutral-200 hover:bg-neutral-100 focus-visible:ring-neutral-500":
              variant === "secondary",

            // Ghost button (transparent background)
            "bg-transparent text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-500":
              variant === "ghost",
          },

          // Size styles
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6": size === "md",
            "h-[44px] px-md py-sm w-full": size === "lg",
          },

          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

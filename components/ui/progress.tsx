"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative overflow-visible h-2.5 w-full rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary/20 overflow-hidden",
        uv: "bg-[linear-gradient(to_right,var(--color-green-500)_0%,var(--color-yellow-400)_20%,var(--color-orange-500)_40%,var(--color-red-500)_60%,var(--color-pink-500)_80%,var(--color-purple-500)_100%)]",
        aqi: "bg-[linear-gradient(to_right,var(--color-green-500)_0%,var(--color-yellow-400)_16.67%,var(--color-orange-500)_33.33%,var(--color-red-500)_50%,var(--color-purple-500)_66.67%,var(--color-rose-950)_90%,var(--color-rose-950)_100%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const progressIndicatorVariants = cva("h-full transition-all", {
  variants: {
    variant: {
      default: "bg-primary ",
      circle: "absolute w-2 h-2 rounded-full ring-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProgressProps
  extends
    React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
}

function Progress({
  className,
  value,
  variant,
  indicatorVariant,
  ...props
}: ProgressProps) {
  const isCircleIndicator = indicatorVariant === "circle";
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressVariants({ variant }), className)}
      {...props}
    >
      {isCircleIndicator && (
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            progressIndicatorVariants({ variant: indicatorVariant })
          )}
          style={{
            left: `${value || 0}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {!isCircleIndicator && (
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            progressIndicatorVariants({ variant: indicatorVariant })
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      )}
    </ProgressPrimitive.Root>
  );
}

export { Progress, progressVariants, progressIndicatorVariants };

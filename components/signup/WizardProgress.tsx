"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStepNumber: number; // 1 to 4
  totalSteps?: number;
}

const STEP_LABELS = ["Basic Profile", "Location & Work", "Vibes & Hangouts", "Social & Bio"];

export function WizardProgress({
  currentStepNumber,
  totalSteps = 4,
}: WizardProgressProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-2">
      {/* Step Header info */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-violet-700 dark:text-violet-300">
          Step {currentStepNumber} of {totalSteps}
        </span>
        <span className="text-zinc-500 dark:text-zinc-400">
          {STEP_LABELS[currentStepNumber - 1] || "Profile Details"}
        </span>
      </div>

      {/* 4-Segment Progress Bar */}
      <div
        className="flex items-center gap-1.5"
        role="progressbar"
        aria-valuenow={currentStepNumber}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label="Signup progress"
      >
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepIndex = index + 1;
          const isFilled = stepIndex <= currentStepNumber;
          const isCurrent = stepIndex === currentStepNumber;

          return (
            <div
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                isFilled
                  ? "bg-linear-to-r from-violet-600 to-fuchsia-600"
                  : "bg-zinc-200 dark:bg-zinc-800",
                isCurrent && "ring-2 ring-violet-500/30 dark:ring-violet-400/30"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

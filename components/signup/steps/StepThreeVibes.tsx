"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WizardHeader } from "../WizardHeader";
import { WizardProgress } from "../WizardProgress";
import {
  stepThreeVibesSchema,
  StepThreeVibesInput,
} from "@/lib/validations/signup.schema";
import { SignupFormData } from "@/types/signup";
import { VIBE_OPTIONS, HANGOUT_STYLES } from "@/lib/data/locations";

interface StepThreeVibesProps {
  initialData: SignupFormData;
  onSaveAndNext: (data: Partial<SignupFormData>) => void;
  onBack: () => void;
}

export function StepThreeVibes({
  initialData,
  onSaveAndNext,
  onBack,
}: StepThreeVibesProps) {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StepThreeVibesInput>({
    resolver: zodResolver(stepThreeVibesSchema),
    defaultValues: {
      vibes: initialData.vibes || [],
      hangoutStyle: initialData.hangoutStyle || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const selectedVibes = watch("vibes") || [];
  const selectedStyle = watch("hangoutStyle");

  const toggleVibe = (id: string) => {
    let updated: string[];
    if (selectedVibes.includes(id)) {
      updated = selectedVibes.filter((v) => v !== id);
    } else {
      if (selectedVibes.length >= 6) return;
      updated = [...selectedVibes, id];
    }
    setValue("vibes", updated, { shouldValidate: true });
  };

  const onSubmit = (data: StepThreeVibesInput) => {
    onSaveAndNext({
      vibes: data.vibes,
      hangoutStyle: data.hangoutStyle,
    });
  };

  return (
    <div className="flex flex-col">
      <WizardHeader
        title="Choose your vibe"
        subtitle="Select at least 2 interests to personalize your community feed."
        onBack={onBack}
        showBack={true}
      />

      <WizardProgress currentStepNumber={3} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {/* Vibe Selection Tags */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label id="vibes-label" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Vibe Interests (min 2, max 6) <span className="text-violet-600 dark:text-violet-400">*</span>
            </Label>
            <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400">
              {selectedVibes.length} / 6 selected
            </span>
          </div>

          <div role="group" aria-labelledby="vibes-label" className="flex flex-wrap gap-2 pt-1">
            {VIBE_OPTIONS.map((vibe) => {
              const isSelected = selectedVibes.includes(vibe.id);
              return (
                <button
                  key={vibe.id}
                  type="button"
                  role="checkbox"
                  aria-checked={isSelected}
                  aria-label={vibe.label}
                  onClick={() => toggleVibe(vibe.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-violet-500 outline-none",
                    isSelected
                      ? "border border-violet-500/40 bg-linear-to-r from-violet-600/15 via-purple-600/15 to-fuchsia-600/15 text-violet-900 shadow-xs ring-2 ring-violet-500/25 dark:border-violet-400/40 dark:text-violet-100"
                      : "border border-zinc-200/80 bg-zinc-50/80 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  )}
                >
                  <span>{vibe.label}</span>
                  {isSelected && <Check className="size-3.5 text-violet-600 dark:text-violet-400" />}
                </button>
              );
            })}
          </div>

          {errors.vibes && (
            <p role="alert" className="text-xs font-medium text-destructive mt-1">
              {errors.vibes.message}
            </p>
          )}
        </div>

        {/* Hangout Group Energy */}
        <div className="flex flex-col gap-2 pt-1">
          <Label id="style-label" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Preferred Hangout Group Size <span className="text-violet-600 dark:text-violet-400">*</span>
          </Label>
          <div role="radiogroup" aria-labelledby="style-label" className="flex flex-col gap-2">
            {HANGOUT_STYLES.map((style) => {
              const isSelected = selectedStyle === style.value;
              return (
                <button
                  key={style.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setValue("hangoutStyle", style.value, { shouldValidate: true })}
                  className={cn(
                    "flex items-center justify-between rounded-xl p-3 text-left text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 outline-none",
                    isSelected
                      ? "border border-violet-500/40 bg-violet-500/10 text-violet-900 ring-2 ring-violet-500/20 dark:border-violet-400/40 dark:bg-violet-400/10 dark:text-violet-200"
                      : "border border-zinc-200/80 bg-zinc-50/70 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  )}
                >
                  <span>{style.label}</span>
                  {isSelected && <Check className="size-4 text-violet-600 dark:text-violet-400" />}
                </button>
              );
            })}
          </div>
          {errors.hangoutStyle && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.hangoutStyle.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-2 h-12 rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 cursor-pointer"
        >
          <span>Continue to Socials</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

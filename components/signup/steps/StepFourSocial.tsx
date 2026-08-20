"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  Loader2,
  Sparkles,
  CheckCircle2,
  Bug,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WizardHeader } from "../WizardHeader";
import { WizardProgress } from "../WizardProgress";
import {
  stepFourSocialSchema,
  StepFourSocialInput,
} from "@/lib/validations/signup.schema";
import { SignupFormData } from "@/types/signup";
import { AVAILABILITY_OPTIONS } from "@/lib/data/locations";

interface StepFourSocialProps {
  initialData: SignupFormData;
  isSubmitting: boolean;
  demoMode?: boolean;
  simulateFailure: boolean;
  onToggleSimulateFailure: () => void;
  onFinalSubmit: (data: StepFourSocialInput) => void;
  onBack: () => void;
}

export function StepFourSocial({
  initialData,
  isSubmitting,
  demoMode = false,
  simulateFailure,
  onToggleSimulateFailure,
  onFinalSubmit,
  onBack,
}: StepFourSocialProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StepFourSocialInput>({
    resolver: zodResolver(stepFourSocialSchema),
    defaultValues: {
      instagramHandle: initialData.instagramHandle || "",
      bio: initialData.bio || "",
      availability: initialData.availability || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const bioValue = watch("bio") || "";
  const selectedAvailability = watch("availability");

  const onSubmit = (data: StepFourSocialInput) => {
    if (isSubmitting) return;
    onFinalSubmit(data);
  };

  return (
    <div className="flex flex-col">
      <WizardHeader
        title="Socials & Bio"
        subtitle="Last step! Introduce yourself to fellow extroverts."
        onBack={onBack}
        showBack={true}
      />

      <WizardProgress currentStepNumber={4} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5" noValidate>
        {/* Instagram Handle */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="instagramHandle" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Instagram Handle <span className="text-violet-600 dark:text-violet-400">*</span>
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <AtSign className="h-4 w-4" />
            </div>
            <Input
              id="instagramHandle"
              maxLength={30}
              placeholder="your_handle"
              className={cn(
                "h-11 rounded-xl pl-9 text-sm",
                errors.instagramHandle && "border-destructive focus-visible:ring-destructive/30"
              )}
              aria-invalid={!!errors.instagramHandle}
              aria-describedby={errors.instagramHandle ? "instagram-error" : undefined}
              {...register("instagramHandle")}
            />
          </div>
          {errors.instagramHandle && (
            <p id="instagram-error" role="alert" className="text-xs font-medium text-destructive">
              {errors.instagramHandle.message}
            </p>
          )}
        </div>

        {/* Bio with Live Character Counter */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Short Bio <span className="text-violet-600 dark:text-violet-400">*</span>
            </Label>
            <span
              className={cn(
                "text-[10px] font-mono",
                bioValue.length >= 10 && bioValue.length <= 180
                  ? "text-zinc-500 dark:text-zinc-400"
                  : "text-amber-600 dark:text-amber-400 font-semibold"
              )}
            >
              {Math.min(bioValue.length, 180)} / 180 chars
            </span>
          </div>
          <Textarea
            id="bio"
            rows={3}
            maxLength={180}
            placeholder="Tell us what excites you, your favorite weekend plans, or your go-to weekend vibe..."
            className={cn(
              "rounded-xl text-sm leading-relaxed",
              errors.bio && "border-destructive focus-visible:ring-destructive/30"
            )}
            aria-invalid={!!errors.bio}
            aria-describedby={errors.bio ? "bio-error" : undefined}
            {...register("bio")}
          />
          {errors.bio ? (
            <p id="bio-error" role="alert" className="text-xs font-medium text-destructive">
              {errors.bio.message}
            </p>
          ) : (
            <p className="text-[11px] text-zinc-400">
              Minimum 10 characters so others can get a sense of your vibe.
            </p>
          )}
        </div>

        {/* Typical Availability */}
        <div className="flex flex-col gap-2">
          <Label id="availability-label" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Typical Availability <span className="text-violet-600 dark:text-violet-400">*</span>
          </Label>
          <div
            role="radiogroup"
            aria-labelledby="availability-label"
            className="flex flex-col gap-1.5"
          >
            {AVAILABILITY_OPTIONS.map((item) => {
              const isSelected = selectedAvailability === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setValue("availability", item.value, { shouldValidate: true })}
                  className={cn(
                    "flex items-center justify-between rounded-xl p-2.5 text-left text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 outline-none",
                    isSelected
                      ? "border border-violet-500/40 bg-violet-500/10 text-violet-900 ring-2 ring-violet-500/20 dark:border-violet-400/40 dark:bg-violet-400/10 dark:text-violet-200"
                      : "border border-zinc-200/80 bg-zinc-50/70 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  )}
                >
                  <span>{item.label}</span>
                  {isSelected && <CheckCircle2 className="size-4 text-violet-600 dark:text-violet-400" />}
                </button>
              );
            })}
          </div>
          {errors.availability && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.availability.message}
            </p>
          )}
        </div>

        {/* Final Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 h-12 rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Completing Profile...
            </>
          ) : (
            <>
              <span>Complete Signup</span>
              <Sparkles className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Evaluator Simulation Control (Only in demo mode /signup?demo=true) */}
      {demoMode && (
        <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3.5 text-[11px] text-zinc-400 dark:border-white/10">
          <span className="flex items-center gap-1">
            <Bug className="h-3 w-3" />
            <span>Demo Mode — Simulate Submission Failure:</span>
          </span>
          <button
            type="button"
            onClick={onToggleSimulateFailure}
            className={cn(
              "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase transition-colors cursor-pointer",
              simulateFailure
                ? "bg-red-500 text-white"
                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            )}
          >
            {simulateFailure ? "ON (Failing)" : "OFF (Normal)"}
          </button>
        </div>
      )}
    </div>
  );
}

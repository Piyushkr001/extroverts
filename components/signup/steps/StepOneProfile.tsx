"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User, Calendar, AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WizardHeader } from "../WizardHeader";
import { WizardProgress } from "../WizardProgress";
import {
  stepOneProfileSchema,
  StepOneProfileInput,
} from "@/lib/validations/signup.schema";
import { SignupFormData } from "@/types/signup";

interface StepOneProfileProps {
  initialData: SignupFormData;
  onSaveAndNext: (data: Partial<SignupFormData>) => void;
  onBack: () => void;
}

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non_binary", label: "Non-binary" },
  { value: "other", label: "Other / Custom" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export function StepOneProfile({
  initialData,
  onSaveAndNext,
  onBack,
}: StepOneProfileProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StepOneProfileInput>({
    resolver: zodResolver(stepOneProfileSchema),
    defaultValues: {
      fullName: initialData.fullName || "",
      age: typeof initialData.age === "number" ? initialData.age : undefined,
      gender: initialData.gender || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const selectedGender = watch("gender");
  const enteredAge = watch("age");

  const onSubmit = (data: StepOneProfileInput) => {
    onSaveAndNext({
      fullName: data.fullName,
      age: data.age,
      gender: data.gender,
    });
  };

  return (
    <div className="flex flex-col">
      <WizardHeader
        title="Tell us about yourself"
        subtitle="Basic profile details so friends can recognize you."
        onBack={onBack}
        showBack={true}
      />

      <WizardProgress currentStepNumber={1} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5" noValidate>
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="fullName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Full Name <span className="text-violet-600 dark:text-violet-400">*</span>
            </Label>
            <span className="text-[10px] text-zinc-400">2-50 chars</span>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <User className="h-4 w-4" />
            </div>
            <Input
              id="fullName"
              maxLength={50}
              placeholder="e.g. Alex Johnson"
              className={cn(
                "h-11 rounded-xl pl-9 text-sm",
                errors.fullName && "border-destructive focus-visible:ring-destructive/30"
              )}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="text-xs font-medium text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Age (with < 18 Contextual Alert) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="age" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Age <span className="text-violet-600 dark:text-violet-400">*</span>
            </Label>
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
              Must be 18+
            </span>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <Calendar className="h-4 w-4" />
            </div>
            <Input
              id="age"
              type="number"
              inputMode="numeric"
              min={18}
              max={120}
              placeholder="e.g. 21"
              className={cn(
                "h-11 rounded-xl pl-9 text-sm",
                errors.age && "border-destructive focus-visible:ring-destructive/30"
              )}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? "age-error" : undefined}
              {...register("age", { valueAsNumber: true })}
            />
          </div>

          {errors.age && (
            <p id="age-error" role="alert" className="text-xs font-medium text-destructive">
              {errors.age.message}
            </p>
          )}

          {/* Under-18 Proactive Notice */}
          {Number(enteredAge) > 0 && Number(enteredAge) < 18 && (
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-xs font-medium text-amber-800 dark:text-amber-300">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>Extroverts is an 18+ community for safety compliance.</span>
            </div>
          )}
        </div>

        {/* Gender / Pronouns */}
        <div className="flex flex-col gap-2">
          <Label id="gender-label" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Gender / Pronouns <span className="text-violet-600 dark:text-violet-400">*</span>
          </Label>
          <div role="radiogroup" aria-labelledby="gender-label" className="flex flex-wrap gap-1.5">
            {GENDER_OPTIONS.map((option) => {
              const isSelected = selectedGender === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setValue("gender", option.value, { shouldValidate: true })}
                  className={cn(
                    "rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 outline-none",
                    isSelected
                      ? "border border-violet-500/40 bg-linear-to-r from-violet-600/15 to-fuchsia-600/15 text-violet-800 ring-2 ring-violet-500/20 dark:border-violet-400/40 dark:text-violet-200"
                      : "border border-zinc-200/80 bg-zinc-50/80 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {errors.gender && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-4 h-12 rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 cursor-pointer"
        >
          <span>Continue to Location</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

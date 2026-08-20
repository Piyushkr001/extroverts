"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MapPin, Building2, GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WizardHeader } from "../WizardHeader";
import { WizardProgress } from "../WizardProgress";
import {
  stepTwoLocationSchema,
  StepTwoLocationInput,
} from "@/lib/validations/signup.schema";
import { SignupFormData } from "@/types/signup";
import { INDIAN_LOCATIONS } from "@/lib/data/locations";

interface StepTwoLocationProps {
  initialData: SignupFormData;
  onSaveAndNext: (data: Partial<SignupFormData>) => void;
  onBack: () => void;
}

export function StepTwoLocation({
  initialData,
  onSaveAndNext,
  onBack,
}: StepTwoLocationProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StepTwoLocationInput>({
    resolver: zodResolver(stepTwoLocationSchema),
    defaultValues: {
      state: initialData.state || "",
      city: initialData.city || "",
      collegeOrWorkplace: initialData.collegeOrWorkplace || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const selectedState = watch("state");
  const selectedCity = watch("city");

  // Filter cities for selected state
  const stateData = React.useMemo(() => {
    return INDIAN_LOCATIONS.find((loc) => loc.state === selectedState);
  }, [selectedState]);

  const availableCities = React.useMemo(() => {
    return stateData?.cities || [];
  }, [stateData]);

  // Popular colleges in selected city for quick autocomplete suggestion
  const cityData = React.useMemo(() => {
    return availableCities.find((c) => c.name === selectedCity);
  }, [availableCities, selectedCity]);

  // Handle State Change -> Reset dependent City & College
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setValue("state", newState, { shouldValidate: true });
    setValue("city", "", { shouldValidate: false });
    setValue("collegeOrWorkplace", "", { shouldValidate: false });
  };

  // Handle City Change -> Reset dependent College / Workplace
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setValue("city", newCity, { shouldValidate: true });
    setValue("collegeOrWorkplace", "", { shouldValidate: false });
  };

  const onSubmit = (data: StepTwoLocationInput) => {
    onSaveAndNext({
      state: data.state,
      city: data.city,
      collegeOrWorkplace: data.collegeOrWorkplace,
    });
  };

  return (
    <div className="flex flex-col">
      <WizardHeader
        title="Location & Campus / Work"
        subtitle="Match with hangouts happening in your city and campus."
        onBack={onBack}
        showBack={true}
      />

      <WizardProgress currentStepNumber={2} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5" noValidate>
        {/* State Selector */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="state-select" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            State / Region <span className="text-violet-600 dark:text-violet-400">*</span>
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <MapPin className="h-4 w-4" />
            </div>
            <select
              id="state-select"
              value={selectedState}
              onChange={handleStateChange}
              className={cn(
                "h-11 w-full rounded-xl border border-input bg-transparent pl-9 pr-8 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30",
                errors.state && "border-destructive focus-visible:ring-destructive/30"
              )}
              aria-invalid={!!errors.state}
            >
              <option value="" disabled className="dark:bg-zinc-900">
                Select your state...
              </option>
              {INDIAN_LOCATIONS.map((loc) => (
                <option key={loc.state} value={loc.state} className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                  {loc.state}
                </option>
              ))}
            </select>
          </div>
          {errors.state && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.state.message}
            </p>
          )}
        </div>

        {/* Dependent City Selector */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="city-select" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            City <span className="text-violet-600 dark:text-violet-400">*</span>
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <Building2 className="h-4 w-4" />
            </div>
            <select
              id="city-select"
              disabled={!selectedState}
              value={selectedCity}
              onChange={handleCityChange}
              className={cn(
                "h-11 w-full rounded-xl border border-input bg-transparent pl-9 pr-8 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-input/30",
                errors.city && "border-destructive focus-visible:ring-destructive/30"
              )}
              aria-invalid={!!errors.city}
            >
              <option value="" disabled className="dark:bg-zinc-900">
                {selectedState ? "Select your city..." : "Select state first"}
              </option>
              {availableCities.map((city) => (
                <option key={city.name} value={city.name} className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          {errors.city && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* College / Workplace */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="collegeOrWorkplace" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              College / University / Workplace <span className="text-violet-600 dark:text-violet-400">*</span>
            </Label>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <GraduationCap className="h-4 w-4" />
            </div>
            <Input
              id="collegeOrWorkplace"
              maxLength={80}
              placeholder="e.g. Symbiosis Pune or Google"
              className={cn(
                "h-11 rounded-xl pl-9 text-sm",
                errors.collegeOrWorkplace && "border-destructive focus-visible:ring-destructive/30"
              )}
              aria-invalid={!!errors.collegeOrWorkplace}
              aria-describedby={errors.collegeOrWorkplace ? "college-error" : undefined}
              {...register("collegeOrWorkplace")}
            />
          </div>
          {errors.collegeOrWorkplace && (
            <p id="college-error" role="alert" className="text-xs font-medium text-destructive">
              {errors.collegeOrWorkplace.message}
            </p>
          )}

          {/* Quick Suggestions based on selected city */}
          {cityData && cityData.popularColleges.length > 0 && (
            <div className="mt-1 flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-zinc-400">Quick select:</span>
              {cityData.popularColleges.slice(0, 3).map((inst) => (
                <button
                  key={inst}
                  type="button"
                  onClick={() => setValue("collegeOrWorkplace", inst, { shouldValidate: true })}
                  className="rounded-lg border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 text-[10px] text-zinc-600 hover:bg-violet-50 hover:text-violet-700 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 dark:hover:bg-violet-950/40 dark:hover:text-violet-300 transition-colors"
                >
                  {inst}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-4 h-12 rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 cursor-pointer"
        >
          <span>Continue to Vibes</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

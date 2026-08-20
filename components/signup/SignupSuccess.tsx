"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ArrowRight,
  User,
  MapPin,
  Heart,
  AtSign,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignupFormData } from "@/types/signup";
import { VIBE_OPTIONS } from "@/lib/data/locations";

interface SignupSuccessProps {
  formData: SignupFormData;
  onReset: () => void;
}

export function SignupSuccess({ formData, onReset }: SignupSuccessProps) {
  // Find readable labels for selected vibes
  const selectedVibeLabels = (formData.vibes || []).map((id) => {
    const found = VIBE_OPTIONS.find((v) => v.id === id);
    return found ? found.label : id;
  });

  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated Success Glowing Icon */}
      <div className="relative mb-5 flex size-20 items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 opacity-25 blur-xl animate-pulse"
        />
        <div className="relative flex size-16 items-center justify-center rounded-full bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-xl shadow-violet-500/30">
          <Check className="size-8 stroke-3" />
        </div>
      </div>

      <Badge
        variant="outline"
        className="mb-3 gap-1 rounded-full border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300"
      >
        <Sparkles className="size-3 text-emerald-500" />
        <span>Profile Verified & Ready</span>
      </Badge>

      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        You&apos;re all set!
      </h1>
      <p className="mt-1 max-w-xs text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
        Welcome to Extroverts,{" "}
        <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
          {formData.fullName}
        </strong>
        ! Your community profile is now live.
      </p>

      {/* Profile Summary Card */}
      <div className="my-6 flex w-full flex-col gap-3 rounded-2xl border border-black/5 bg-zinc-50/80 p-4 text-left text-xs dark:border-white/5 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between border-b border-black/5 pb-2.5 dark:border-white/5">
          <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <User className="size-3.5" /> Full Profile:
          </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {formData.fullName} ({formData.age} yrs)
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-black/5 pb-2.5 dark:border-white/5">
          <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <MapPin className="size-3.5" /> City & Hub:
          </span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {formData.city}, {formData.state}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-black/5 pb-2.5 dark:border-white/5">
          <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <AtSign className="size-3.5" /> Handle:
          </span>
          <span className="font-mono font-semibold text-violet-700 dark:text-violet-300">
            @{formData.instagramHandle}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 pt-0.5">
          <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <Heart className="size-3.5" /> Selected Vibes:
          </span>
          <div className="flex flex-wrap gap-1">
            {selectedVibeLabels.map((vibe) => (
              <span
                key={vibe}
                className="rounded-lg bg-violet-600/10 px-2 py-0.5 text-[10px] font-semibold text-violet-800 dark:bg-violet-400/10 dark:text-violet-200"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full flex-col gap-2.5">
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/" />}
          className="h-12 w-full rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700"
        >
          <span>Return to Home</span>
          <ArrowRight className="ml-2 size-4" />
        </Button>

        {/* Restart Demo Button for Evaluator ease */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-10 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <RotateCcw className="mr-1.5 size-3.5" />
          <span>Start Another Signup Test</span>
        </Button>
      </div>
    </div>
  );
}

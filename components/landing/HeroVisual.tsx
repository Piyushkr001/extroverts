"use client";

import * as React from "react";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
  Flame,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const VIBE_TAGS = [
  { label: "Rooftop Party 🍸", selected: true },
  { label: "Live Music 🎸", selected: true },
  { label: "Coffee Chats ☕", selected: true },
  { label: "Board Games 🎲", selected: false },
  { label: "Sunset Treks 🌅", selected: false },
  { label: "Night Foodies 🍕", selected: true },
];

export function HeroVisual() {
  return (
    <div className="relative flex flex-1 items-center justify-center py-6 lg:py-0">
      {/* Background Radial Glow Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-80 w-80 rounded-full bg-linear-to-tr from-violet-500/30 via-purple-500/25 to-fuchsia-500/30 blur-3xl dark:from-violet-600/25 dark:via-purple-600/20 dark:to-fuchsia-600/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-linear-to-br from-purple-500/25 via-indigo-500/20 to-fuchsia-500/25 blur-3xl dark:from-purple-600/20 dark:via-indigo-600/15 dark:to-fuchsia-600/20"
      />

      {/* Main Mobile App Mockup Frame */}
      <div className="relative z-10 w-full max-w-85 sm:max-w-95 rounded-[2.5rem] border border-white/80 bg-white/70 p-4 sm:p-5 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-violet-950/40 dark:ring-white/10">
        {/* Dynamic Island / Speaker Pill */}
        <div className="mx-auto mb-3 flex h-4 w-28 items-center justify-center rounded-full bg-zinc-900/90 dark:bg-zinc-800/90">
          <div className="size-2 rounded-full bg-zinc-800 dark:bg-zinc-700" />
        </div>

        {/* Mobile Status Bar */}
        <div className="mb-4 flex items-center justify-between px-2 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3 w-3" />
          </div>
        </div>

        {/* Mockup Inside Header */}
        <div className="mb-4 flex items-center justify-between border-b border-black/5 pb-3.5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Image
              src="/Images/Logo/logo.webp"
              alt="Extroverts App"
              width={90}
              height={90}
              className="h-8 w-auto object-contain rounded-sm"
            />
          </div>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 rounded-full bg-violet-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"
          >
            <Flame className="h-3 w-3 text-orange-500" />
            <span>Wizard</span>
          </Badge>
        </div>

        {/* Mockup Content: Onboarding Step 1 Preview */}
        <div className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-zinc-50/80 p-4 dark:border-white/5 dark:bg-zinc-800/60">
          {/* Step Progress Header */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-violet-600 dark:text-violet-400">
              Step 1 of 4
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
              Vibe & Energy
            </span>
          </div>

          {/* 4 Step Progress Segment Bars */}
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600" />
            <div className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Step Prompt */}
          <div className="mt-1">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              What&apos;s your hangout style?
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Pick your interests to get curated group matches.
            </p>
          </div>

          {/* Vibe Tags Grid */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {VIBE_TAGS.map((tag) => (
              <span
                key={tag.label}
                className={cn(
                  "inline-flex items-center rounded-xl px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                  tag.selected
                    ? "border border-violet-500/30 bg-linear-to-r from-violet-600/15 via-purple-600/15 to-fuchsia-600/15 text-violet-800 shadow-xs dark:border-violet-400/30 dark:text-violet-200"
                    : "border border-zinc-200/80 bg-white/80 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400"
                )}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* Mini Action Button */}
          <div className="mt-2 flex items-center justify-between rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-500/20">
            <span>Continue to Step 2</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        {/* Live Matching Active Social Indicator inside Card */}
        <div className="mt-3.5 flex items-center justify-between rounded-2xl border border-black/5 bg-white/60 p-2.5 backdrop-blur-sm dark:border-white/5 dark:bg-zinc-800/40">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="flex size-6 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
                A
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-purple-600 text-[9px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
                S
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-fuchsia-600 text-[9px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
                M
              </div>
            </div>
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              <strong className="text-zinc-900 dark:text-zinc-100">18+</strong> matching now
            </span>
          </div>
          <span className="flex size-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
        </div>
      </div>

      {/* Floating Card 1: Top Right (Hangouts Badge) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 -right-2 sm:-right-8 hidden sm:flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-3 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90 dark:shadow-purple-950/30"
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Live Nearby
            </p>
          </div>
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            24+ Active Hangouts
          </p>
        </div>
      </div>

      {/* Floating Card 2: Bottom Left (Match Rate Badge) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -left-2 sm:-left-8 hidden sm:flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-3 shadow-xl shadow-fuchsia-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90 dark:shadow-fuchsia-950/30"
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/20">
          <Heart className="h-4 w-4 fill-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            98% Vibe Match
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Based on shared interests
          </p>
        </div>
      </div>
    </div>
  );
}

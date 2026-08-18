"use client";

import { HeroContent } from "@/components/landing/HeroContent";
import { HeroVisual } from "@/components/landing/HeroVisual";
import * as React from "react";

export function LandingScreen() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex-1 overflow-hidden bg-linear-to-b from-white via-violet-50/40 to-purple-100/30 transition-colors duration-300 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950">
      {/* Subtle Ambient Background Decorative Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-600/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-[-10%] h-137.5 w-137.5 rounded-full bg-fuchsia-400/15 blur-3xl dark:bg-fuchsia-600/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] left-1/3 h-112.5 w-112.5 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/10"
      />

      {/* Main Hero Container */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-16 lg:px-8">
        {/* Left Column: Hero Content & CTA */}
        <HeroContent />

        {/* Right Column: Mobile Onboarding Visual Mockup */}
        <HeroVisual />
      </section>
    </main>
  );
}

export default LandingScreen;

"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Users, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SparklesText } from "../ui/sparkles-text";
import { AnimatedGradientText } from "../ui/animated-gradient-text";

export function HeroContent() {
  return (
    <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
      {/* 1. Small Pill Badge */}
      <Badge
        variant="outline"
        className="mb-6 inline-flex items-center gap-2 rounded-full border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-500/15 dark:border-violet-400/20 dark:bg-violet-400/10"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
        <AnimatedGradientText
          colorFrom="#7c3aed"
          colorTo="#c026d3"
          speed={1}
        >
          Meet • Connect • Belong
        </AnimatedGradientText>
      </Badge>
      

      {/* 2. Main Hero Heading */}
      {/* aria-label provides the full heading text for screen readers since SparklesText is aria-hidden below */}
      <h1
        aria-label="Discover people. Create connections. Make every moment count."
        className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.08] dark:text-zinc-50"
      >
        Discover people. <br className="hidden sm:inline" />
        Create connections.
      </h1>
      {/* SparklesText renders a <div> internally — must live outside the <h1> */}
      <SparklesText
        aria-hidden="true"
        className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.08]"
      >
        <span className="bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-purple-300 dark:to-fuchsia-400">
          Make every moment count.
        </span>
      </SparklesText>

      {/* 3. Supporting Description */}
      <p className="mt-6 max-w-xl text-base text-zinc-600 sm:text-lg sm:leading-relaxed dark:text-zinc-400">
        A vibrant social space designed to discover genuine hangouts, meet
        like-minded people, and turn spontaneous vibes into lasting
        connections.
      </p>

      {/* 4. CTA Row */}
      <div className="mt-8 flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center">
        {/* Primary CTA: Navigates to /terms or /signup */}
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/terms" />}
          className={cn(
            "group relative h-13 rounded-2xl px-8 text-base font-semibold text-white",
            "bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600",
            "shadow-lg shadow-violet-500/25 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/35 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700",
            "active:scale-[0.99]"
          )}
        >
          <span>Start Signup</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>

        {/* Secondary Action */}
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href="/about" />}
          className="h-13 rounded-2xl border-zinc-200/80 bg-white/60 px-6 text-base font-medium text-zinc-800 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Explore Community
        </Button>
      </div>

      {/* 5. Micro Value Indicators */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2 text-xs font-medium text-zinc-500 sm:text-sm lg:justify-start dark:text-zinc-400">
        <div className="inline-flex items-center gap-1.5">
          <div className="flex size-5 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
            <Zap className="h-3 w-3" />
          </div>
          <span>Fast 4-Step Signup</span>
        </div>

        <div className="inline-flex items-center gap-1.5">
          <div className="flex size-5 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-300">
            <Users className="h-3 w-3" />
          </div>
          <span>Community-Focused</span>
        </div>

        <div className="inline-flex items-center gap-1.5">
          <div className="flex size-5 items-center justify-center rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-400/10 dark:text-fuchsia-300">
            <ShieldCheck className="h-3 w-3" />
          </div>
          <span>Privacy-Conscious</span>
        </div>
      </div>
    </div>
  );
}

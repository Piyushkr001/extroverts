"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export function TermsScreen() {
  const [agreed, setAgreed] = React.useState(false);

  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex-1 overflow-hidden bg-linear-to-b from-white via-violet-50/40 to-purple-100/30 py-10 transition-colors duration-300 sm:py-14 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950">
      {/* Background Radial Glow Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-600/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-fuchsia-400/15 blur-3xl dark:bg-fuchsia-600/10"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Navigation Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/" />}
            className="group gap-1.5 rounded-full px-3 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Button>

          <Badge
            variant="outline"
            className="gap-1 rounded-full border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>Step 0 of 4</span>
          </Badge>
        </div>

        {/* Main Terms Card */}
        <div className="flex flex-col rounded-3xl border border-white/80 bg-white/75 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl ring-1 ring-black/5 sm:p-10 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-violet-950/30 dark:ring-white/10">
          {/* Card Header */}
          <div className="mb-6 flex flex-col items-center text-center">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/Images/Logo/logo.webp"
                alt="Extroverts Logo"
                width={100}
                height={100}
                priority
                className="h-10 w-auto object-contain rounded-md sm:h-11"
              />
            </Link>

            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Please review and accept our community standards before proceeding
              to the signup wizard.
            </p>
          </div>

          {/* Scrollable Terms Content */}
          <div className="mb-6 flex max-h-95 flex-col gap-4 overflow-y-auto rounded-2xl border border-black/5 bg-zinc-50/70 p-5 text-sm leading-relaxed text-zinc-700 sm:p-6 dark:border-white/5 dark:bg-zinc-950/50 dark:text-zinc-300">
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-800 dark:text-amber-200">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <strong className="font-semibold">Age Requirement:</strong> You
                must be at least 18 years old to register and participate in
                Extroverts events and hangouts.
              </div>
            </div>

            <section>
              <h2 className="mb-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                1. Welcome to the Extroverts Community
              </h2>
              <p>
                Extroverts is a platform created to facilitate real-world social
                connections, genuine meetups, and high-vibe group experiences.
                By continuing, you agree to treat all members with respect,
                dignity, and kindness.
              </p>
            </section>

            <section>
              <h2 className="mb-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                2. Community Code of Conduct
              </h2>
              <p>
                We maintain a strict zero-tolerance policy against harassment,
                hate speech, discrimination, unsolicited solicitation, or any
                form of non-consensual behavior. Violators will face immediate
                and permanent account revocation.
              </p>
            </section>

            <section>
              <h2 className="mb-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                3. Real-World Meetups & Safety
              </h2>
              <p>
                While Extroverts helps connect like-minded individuals, members
                are expected to practice personal safety precautions when
                attending in-person meetups. We encourage initial group
                gatherings in well-lit, public venues.
              </p>
            </section>

            <section>
              <h2 className="mb-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                4. Privacy & Account Authenticity
              </h2>
              <p>
                To maintain a safe and verified environment, members must
                provide accurate profile information. Extroverts does not sell
                your personal data to third parties.
              </p>
            </section>
          </div>

          {/* Agreement Checkbox */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 dark:border-violet-400/20 dark:bg-violet-400/5">
            <Checkbox
              id="terms-agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
              className="mt-0.5"
            />
            <label
              htmlFor="terms-agree"
              className="cursor-pointer text-xs font-medium text-zinc-800 select-none sm:text-sm dark:text-zinc-200"
            >
              I have read, understood, and agree to the{" "}
              <span className="font-semibold text-violet-700 dark:text-violet-300">
                Extroverts Terms of Service
              </span>{" "}
              and confirm that I am at least 18 years of age.
            </label>
          </div>

          {/* Action Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Sparkles className="size-3.5 text-violet-500" />
              <span>Unlocks the 4-step signup wizard</span>
            </div>

            <Button
              size="lg"
              disabled={!agreed}
              nativeButton={false}
              render={<Link href="/signup" />}
              className={cn(
                "h-12 rounded-xl px-8 font-semibold text-white transition-all duration-300",
                agreed
                  ? "bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-violet-500/25 hover:scale-[1.02] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 cursor-pointer"
                  : "bg-zinc-300 text-zinc-500 cursor-not-allowed opacity-60 dark:bg-zinc-800 dark:text-zinc-500"
              )}
            >
              <span>Continue to Signup</span>
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TermsScreen;

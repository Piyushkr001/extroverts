"use client";

import * as React from "react";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface WizardShellProps {
  children: React.ReactNode;
  globalError?: string | null;
  onClearGlobalError?: () => void;
}

export function WizardShell({
  children,
  globalError,
  onClearGlobalError,
}: WizardShellProps) {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex-1 overflow-hidden bg-linear-to-b from-white via-violet-50/40 to-purple-100/30 py-8 sm:py-12 transition-colors duration-300 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950">
      {/* Background Decorative Gradient Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-600/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-fuchsia-400/15 blur-3xl dark:bg-fuchsia-600/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/10"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-115 flex-col px-4 sm:px-6">
        {/* Global Error Banner */}
        {globalError && (
          <Alert
            variant="destructive"
            className="mb-4 flex items-start justify-between rounded-2xl border-red-500/20 bg-red-500/10 p-4 text-red-900 backdrop-blur-md dark:text-red-200"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <AlertTitle className="text-xs font-bold uppercase tracking-wider">
                  Submission Notice
                </AlertTitle>
                <AlertDescription className="mt-0.5 text-xs">
                  {globalError}
                </AlertDescription>
              </div>
            </div>
            {onClearGlobalError && (
              <button
                type="button"
                onClick={onClearGlobalError}
                className="text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-white"
                aria-label="Dismiss error"
              >
                <X className="size-4" />
              </button>
            )}
          </Alert>
        )}

        {/* Glassmorphic Wizard Card Container */}
        <div className="flex flex-col rounded-3xl border border-white/80 bg-white/80 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl ring-1 ring-black/5 sm:p-8 dark:border-white/10 dark:bg-zinc-900/85 dark:shadow-violet-950/30 dark:ring-white/10">
          {children}
        </div>
      </div>
    </main>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WizardHeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
  showBack?: boolean;
}

export function WizardHeader({
  title,
  subtitle,
  onBack,
  showBack = true,
}: WizardHeaderProps) {
  return (
    <div className="relative mb-6 flex flex-col items-center text-center">
      {/* Back Button */}
      {showBack && onBack && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="group absolute top-0 left-0 -ml-2 gap-1 rounded-full px-2.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          aria-label="Go back to previous step"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      )}

      {/* Extroverts App Logo */}
      <Link href="/" className="mb-3 inline-block" aria-label="Extroverts Home">
        <Image
          src="/Images/Logo/logo.webp"
          alt="Extroverts"
          width={90}
          height={90}
          priority
          className="h-9 w-auto object-contain rounded-md sm:h-10"
        />
      </Link>

      <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
        {title}
      </h1>
      <p className="mt-1 max-w-sm text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
        {subtitle}
      </p>
    </div>
  );
}

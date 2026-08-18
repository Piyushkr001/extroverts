"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/5 bg-white/40 py-6 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/Images/Logo/logo.webp"
            alt="Extroverts Logo"
            width={80}
            height={80}
            className="h-7 w-auto object-contain"
          />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Extroverts. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <Link
            href="/about"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            About
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/signup"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Signup Wizard
          </Link>
        </div>
      </div>
    </footer>
  );
}
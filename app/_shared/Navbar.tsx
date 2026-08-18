"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

interface NavLink {
  label: string;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Terms", path: "/terms" },
];

const GRADIENT_BTN_CLASS =
  "bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02] hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 hover:shadow-lg hover:shadow-violet-500/25";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (path: string) => {
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 backdrop-blur-xl bg-linear-to-r from-violet-50/95 via-fuchsia-50/95 to-purple-100/95 dark:border-white/10 dark:from-zinc-950/95 dark:via-violet-950/90 dark:to-zinc-950/95">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Go to home page"
        >
          <Image
            src="/Images/Logo/logo.webp"
            alt="Logo"
            width={100}
            height={100}
            priority
            className="h-10 w-auto rounded-md object-contain sm:h-11"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);

            return (
              <Button
                key={link.path}
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href={link.path} />}
                className={cn(
                  "relative rounded-full px-4 font-medium transition-all duration-200",
                  active
                    ? "bg-violet-600/10 text-violet-700 hover:bg-violet-600/15 hover:text-violet-700 dark:bg-violet-400/10 dark:text-violet-300 dark:hover:bg-violet-400/15 dark:hover:text-violet-200"
                    : "text-zinc-700 hover:bg-black/5 hover:text-violet-700 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-violet-300"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-violet-600 dark:bg-violet-400" />
                )}
              </Button>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
          <Button
            nativeButton={false}
            render={<Link href="/signup" />}
            className={cn("rounded-full px-5", GRADIENT_BTN_CLASS)}
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/40 hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-75 border-l border-black/10 bg-linear-to-b from-violet-50 via-fuchsia-50 to-purple-100 dark:border-white/10 dark:from-zinc-950 dark:via-violet-950 dark:to-zinc-950"
            >
              <SheetHeader className="border-b pb-5 dark:border-white/10">
                <SheetTitle className="text-left">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/Images/Logo/logo.webp"
                      alt="Logo"
                      width={90}
                      height={90}
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 py-6">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path);

                  return (
                    <Button
                      key={link.path}
                      variant={active ? "secondary" : "ghost"}
                      nativeButton={false}
                      render={
                        <Link
                          href={link.path}
                          onClick={() => setIsOpen(false)}
                        />
                      }
                      className={cn(
                        "h-11 justify-start rounded-xl px-4 text-base font-medium",
                        active &&
                          "bg-violet-600/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"
                      )}
                    >
                      {link.label}
                    </Button>
                  );
                })}

                <div className="my-3 h-px bg-black/10 dark:bg-white/10" />

                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                    />
                  }
                  size="lg"
                  className={cn("w-full rounded-xl", GRADIENT_BTN_CLASS)}
                >
                  Start Signup
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
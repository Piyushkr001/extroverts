import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — Extroverts",
  description: "Learn about Extroverts: party, hangout, and vibe community.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex-1 overflow-hidden bg-linear-to-b from-white via-violet-50/40 to-purple-100/30 py-12 transition-colors duration-300 sm:py-16 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col rounded-3xl border border-white/80 bg-white/75 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl ring-1 ring-black/5 sm:p-10 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-violet-950/30 dark:ring-white/10">
          <div className="mb-6 flex flex-col items-center text-center">
            <Image
              src="/Images/Logo/logo.webp"
              alt="Extroverts Logo"
              width={100}
              height={100}
              priority
              className="h-10 w-auto object-contain rounded-md sm:h-11 mb-4"
            />
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              About Extroverts
            </h1>
            <p className="mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              The modern social platform crafted for people who love vibrant
              gatherings, authentic conversations, and spontaneous adventures.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 my-6">
            <div className="rounded-2xl border border-black/5 bg-zinc-50/70 p-5 text-center dark:border-white/5 dark:bg-zinc-950/50">
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
                <Users className="size-5" />
              </div>
              <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Real Community
              </h2>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Meet verified people nearby with shared energy and interests.
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-zinc-50/70 p-5 text-center dark:border-white/5 dark:bg-zinc-950/50">
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-300">
                <Zap className="size-5" />
              </div>
              <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Instant Hangouts
              </h2>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                From rooftop parties to coffee chats, discover plans happening now.
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-zinc-50/70 p-5 text-center dark:border-white/5 dark:bg-zinc-950/50">
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-400/10 dark:text-fuchsia-300">
                <Heart className="size-5" />
              </div>
              <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Safe & Verified
              </h2>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Prioritizing respectful, 18+ verified members and safe venues.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-black/5 dark:border-white/10">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/terms" />}
              className="h-12 rounded-xl px-8 font-semibold text-white bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-violet-500/25 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700"
            >
              <span>Join Extroverts</span>
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/" />}
              className="h-12 rounded-xl px-6"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

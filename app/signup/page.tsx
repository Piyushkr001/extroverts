import * as React from "react";
import { Metadata } from "next";
import { SignupWizard } from "@/components/signup/SignupWizard";
import { WizardShell } from "@/components/signup/WizardShell";

export const metadata: Metadata = {
  title: "Signup Wizard — Extroverts",
  description: "Join the Extroverts community: complete your 4-step profile to discover events and hangouts.",
};

function WizardFallback() {
  return (
    <WizardShell>
      <div className="flex h-64 items-center justify-center">
        <div className="size-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
      </div>
    </WizardShell>
  );
}

export default function SignupPage() {
  return (
    <React.Suspense fallback={<WizardFallback />}>
      <SignupWizard />
    </React.Suspense>
  );
}

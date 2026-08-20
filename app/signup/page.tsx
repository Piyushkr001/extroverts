import { Metadata } from "next";
import { SignupWizard } from "@/components/signup/SignupWizard";

export const metadata: Metadata = {
  title: "Signup Wizard — Extroverts",
  description: "Join the Extroverts community: complete your 4-step profile to discover events and hangouts.",
};

export default function SignupPage() {
  return <SignupWizard />;
}

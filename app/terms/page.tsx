import { Metadata } from "next";
import { TermsScreen } from "@/components/terms/TermsScreen";

export const metadata: Metadata = {
  title: "Terms & Conditions — Extroverts",
  description: "Review Extroverts community guidelines and terms of service.",
};

export default function TermsPage() {
  return <TermsScreen />;
}

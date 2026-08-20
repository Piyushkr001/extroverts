"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WizardShell } from "./WizardShell";
import { VerificationStep } from "./steps/VerificationStep";
import { StepOneProfile } from "./steps/StepOneProfile";
import { StepTwoLocation } from "./steps/StepTwoLocation";
import { StepThreeVibes } from "./steps/StepThreeVibes";
import { StepFourSocial } from "./steps/StepFourSocial";
import { SignupSuccess } from "./SignupSuccess";
import { useSignupWizard } from "@/hooks/useSignupWizard";
import { submitFinalSignupMock } from "@/lib/mock/signup-service";
import { SignupFormData } from "@/types/signup";

import { useTermsAccepted } from "@/lib/storage/terms-storage";

export function SignupWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const demoMode = searchParams.get("demo") === "true";

  const isTermsAccepted = useTermsAccepted();

  const {
    currentStep,
    formData,
    isSubmitting,
    globalError,
    simulateFailure,
    isHydrated,
    setIsSubmitting,
    setGlobalError,
    setSimulateFailure,
    updateFormData,
    goNext,
    goBack,
    resetWizard,
  } = useSignupWizard();

  // Terms Acceptance Guard: Client-side redirect if terms were not accepted
  React.useEffect(() => {
    if (isHydrated && !isTermsAccepted) {
      router.replace(demoMode ? "/terms?demo=true" : "/terms");
    }
  }, [isHydrated, isTermsAccepted, demoMode, router]);

  // Back handler preserving query parameter mode
  const handleBack = () => {
    goBack(() => {
      router.push(demoMode ? "/terms?demo=true" : "/terms");
    });
  };

  // Verification step callback
  const handleEmailVerified = (email: string) => {
    updateFormData({ email, isEmailVerified: true });
    goNext();
  };

  // Step data save and navigate next
  const handleStepSaveAndNext = (stepData: Partial<SignupFormData>) => {
    updateFormData(stepData);
    goNext();
  };

  // Final submission handler
  const handleFinalSubmit = async (lastStepData: Partial<SignupFormData>) => {
    const finalData = { ...formData, ...lastStepData };
    updateFormData(lastStepData);
    setIsSubmitting(true);
    setGlobalError(null);

    try {
      const response = await submitFinalSignupMock(finalData, {
        shouldFail: simulateFailure,
      });

      if (response.success) {
        goNext(); // Advances to 'success' state
      } else {
        setGlobalError(response.message);
      }
    } catch {
      setGlobalError("Unexpected error occurred while creating profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated || !isTermsAccepted) {
    return (
      <WizardShell>
        <div className="flex h-64 items-center justify-center">
          <div className="size-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell
      globalError={globalError}
      onClearGlobalError={() => setGlobalError(null)}
    >
      {currentStep === "verification" && (
        <VerificationStep
          initialEmail={formData.email}
          demoMode={demoMode}
          onVerified={handleEmailVerified}
          onBack={handleBack}
        />
      )}

      {currentStep === "step1_profile" && (
        <StepOneProfile
          initialData={formData}
          onSaveAndNext={handleStepSaveAndNext}
          onBack={handleBack}
        />
      )}

      {currentStep === "step2_location" && (
        <StepTwoLocation
          initialData={formData}
          onSaveAndNext={handleStepSaveAndNext}
          onBack={handleBack}
        />
      )}

      {currentStep === "step3_vibes" && (
        <StepThreeVibes
          initialData={formData}
          onSaveAndNext={handleStepSaveAndNext}
          onBack={handleBack}
        />
      )}

      {currentStep === "step4_social" && (
        <StepFourSocial
          initialData={formData}
          isSubmitting={isSubmitting}
          demoMode={demoMode}
          simulateFailure={simulateFailure}
          onToggleSimulateFailure={() => setSimulateFailure((prev) => !prev)}
          onFinalSubmit={handleFinalSubmit}
          onBack={handleBack}
        />
      )}

      {currentStep === "success" && (
        <SignupSuccess
          formData={formData}
          demoMode={demoMode}
          onReset={resetWizard}
        />
      )}
    </WizardShell>
  );
}

export default SignupWizard;

"use client";

import * as React from "react";
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

export function SignupWizard() {
  const {
    currentStep,
    formData,
    isSubmitting,
    globalError,
    simulateFailure,
    isHydrated,
    setIsSubmitting,
    setGlobalError,
    updateFormData,
    goNext,
    goBack,
    resetWizard,
  } = useSignupWizard();

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

  if (!isHydrated) {
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
          onVerified={handleEmailVerified}
          onBack={goBack}
        />
      )}

      {currentStep === "step1_profile" && (
        <StepOneProfile
          initialData={formData}
          onSaveAndNext={handleStepSaveAndNext}
          onBack={goBack}
        />
      )}

      {currentStep === "step2_location" && (
        <StepTwoLocation
          initialData={formData}
          onSaveAndNext={handleStepSaveAndNext}
          onBack={goBack}
        />
      )}

      {currentStep === "step3_vibes" && (
        <StepThreeVibes
          initialData={formData}
          onSaveAndNext={handleStepSaveAndNext}
          onBack={goBack}
        />
      )}

      {currentStep === "step4_social" && (
        <StepFourSocial
          initialData={formData}
          isSubmitting={isSubmitting}
          onFinalSubmit={handleFinalSubmit}
          onBack={goBack}
        />
      )}

      {currentStep === "success" && (
        <SignupSuccess
          formData={formData}
          onReset={resetWizard}
        />
      )}
    </WizardShell>
  );
}

export default SignupWizard;

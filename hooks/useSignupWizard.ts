"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SignupFormData, WizardStepKey } from "@/types/signup";

const STORAGE_KEY = "extroverts_signup_wizard_state_v1";

const INITIAL_FORM_DATA: SignupFormData = {
  email: "",
  isEmailVerified: false,
  fullName: "",
  age: "",
  gender: "",
  state: "",
  city: "",
  collegeOrWorkplace: "",
  vibes: [],
  hangoutStyle: "",
  instagramHandle: "",
  bio: "",
  availability: "",
};

const STEP_ORDER: WizardStepKey[] = [
  "verification",
  "step1_profile",
  "step2_location",
  "step3_vibes",
  "step4_social",
  "success",
];

function getStoredState() {
  if (typeof window === "undefined") {
    return {
      currentStep: "verification" as WizardStepKey,
      completedSteps: [] as WizardStepKey[],
      formData: INITIAL_FORM_DATA,
    };
  }
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        currentStep: (parsed.currentStep && STEP_ORDER.includes(parsed.currentStep)
          ? parsed.currentStep
          : "verification") as WizardStepKey,
        completedSteps: Array.isArray(parsed.completedSteps)
          ? parsed.completedSteps
          : [],
        formData: parsed.formData
          ? { ...INITIAL_FORM_DATA, ...parsed.formData }
          : INITIAL_FORM_DATA,
      };
    }
  } catch {
    // Ignore parse error
  }
  return {
    currentStep: "verification" as WizardStepKey,
    completedSteps: [] as WizardStepKey[],
    formData: INITIAL_FORM_DATA,
  };
}

export function useSignupWizard() {
  const router = useRouter();

  const [state, setState] = React.useState(getStoredState);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [globalError, setGlobalError] = React.useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = React.useState(false);

  // Sync to sessionStorage
  const persistState = React.useCallback(
    (newState: {
      currentStep: WizardStepKey;
      completedSteps: WizardStepKey[];
      formData: SignupFormData;
    }) => {
      try {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        }
      } catch {
        // Ignore write error
      }
    },
    []
  );

  const updateFormData = React.useCallback(
    (updates: Partial<SignupFormData>) => {
      setState((prev) => {
        const next = {
          ...prev,
          formData: { ...prev.formData, ...updates },
        };
        persistState(next);
        return next;
      });
    },
    [persistState]
  );

  const markStepComplete = React.useCallback(
    (step: WizardStepKey) => {
      setState((prev) => {
        if (prev.completedSteps.includes(step)) return prev;
        const next = {
          ...prev,
          completedSteps: [...prev.completedSteps, step],
        };
        persistState(next);
        return next;
      });
    },
    [persistState]
  );

  const goToStep = React.useCallback(
    (nextStep: WizardStepKey) => {
      setGlobalError(null);
      setState((prev) => {
        const next = { ...prev, currentStep: nextStep };
        persistState(next);
        return next;
      });
    },
    [persistState]
  );

  const goNext = React.useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(state.currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      markStepComplete(state.currentStep);
      goToStep(STEP_ORDER[currentIndex + 1]);
    }
  }, [state.currentStep, markStepComplete, goToStep]);

  const goBack = React.useCallback(() => {
    setGlobalError(null);
    const currentIndex = STEP_ORDER.indexOf(state.currentStep);

    if (currentIndex === 0) {
      router.push("/terms");
      return;
    }

    if (currentIndex > 0) {
      goToStep(STEP_ORDER[currentIndex - 1]);
    }
  }, [state.currentStep, goToStep, router]);

  const resetWizard = React.useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
    const initial = {
      currentStep: "verification" as WizardStepKey,
      completedSteps: [] as WizardStepKey[],
      formData: INITIAL_FORM_DATA,
    };
    setState(initial);
    setGlobalError(null);
  }, []);

  const getStepProgressNumber = React.useCallback((): number | null => {
    switch (state.currentStep) {
      case "step1_profile":
        return 1;
      case "step2_location":
        return 2;
      case "step3_vibes":
        return 3;
      case "step4_social":
        return 4;
      default:
        return null;
    }
  }, [state.currentStep]);

  return {
    currentStep: state.currentStep,
    completedSteps: state.completedSteps,
    formData: state.formData,
    isSubmitting,
    globalError,
    simulateFailure,
    isHydrated: true,
    setIsSubmitting,
    setGlobalError,
    setSimulateFailure,
    updateFormData,
    markStepComplete,
    goToStep,
    goNext,
    goBack,
    resetWizard,
    getStepProgressNumber,
  };
}

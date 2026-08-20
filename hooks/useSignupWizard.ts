"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SignupFormData, WizardStepKey } from "@/types/signup";

import {
  stepOneProfileSchema,
  stepTwoLocationSchema,
  stepThreeVibesSchema,
  stepFourSocialSchema,
} from "@/lib/validations/signup.schema";

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

// Normalize restored step using Zod schemas so invalid or incomplete steps cannot be bypassed
function normalizeAllowedStep(
  requestedStep: WizardStepKey,
  data: SignupFormData
): WizardStepKey {
  if (!data.isEmailVerified || !data.email) {
    return "verification";
  }

  const stepOneValid = stepOneProfileSchema.safeParse({
    fullName: data.fullName,
    age: data.age,
    gender: data.gender,
  }).success;

  if (!stepOneValid) {
    return requestedStep === "verification" ? "verification" : "step1_profile";
  }

  const stepTwoValid = stepTwoLocationSchema.safeParse({
    state: data.state,
    city: data.city,
    collegeOrWorkplace: data.collegeOrWorkplace,
  }).success;

  if (!stepTwoValid) {
    if (requestedStep === "verification" || requestedStep === "step1_profile") {
      return requestedStep;
    }
    return "step2_location";
  }

  const stepThreeValid = stepThreeVibesSchema.safeParse({
    vibes: data.vibes,
    hangoutStyle: data.hangoutStyle,
  }).success;

  if (!stepThreeValid) {
    if (
      requestedStep === "verification" ||
      requestedStep === "step1_profile" ||
      requestedStep === "step2_location"
    ) {
      return requestedStep;
    }
    return "step3_vibes";
  }

  const stepFourValid = stepFourSocialSchema.safeParse({
    instagramHandle: data.instagramHandle,
    bio: data.bio,
    availability: data.availability,
  }).success;

  if (!stepFourValid) {
    if (
      requestedStep === "verification" ||
      requestedStep === "step1_profile" ||
      requestedStep === "step2_location" ||
      requestedStep === "step3_vibes"
    ) {
      return requestedStep;
    }
    return "step4_social";
  }

  return requestedStep;
}

interface StoredWizardData {
  currentStep: WizardStepKey;
  completedSteps: WizardStepKey[];
  formData: SignupFormData;
}

const DEFAULT_WIZARD_DATA: StoredWizardData = {
  currentStep: "verification",
  completedSteps: [],
  formData: INITIAL_FORM_DATA,
};

let currentMemoryState: StoredWizardData = DEFAULT_WIZARD_DATA;
let isInitializedFromStorage = false;
const listeners = new Set<() => void>();

function initStorageOnce() {
  if (isInitializedFromStorage || typeof window === "undefined") return;
  isInitializedFromStorage = true;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        const parsedFormData: SignupFormData = {
          ...INITIAL_FORM_DATA,
          ...(parsed.formData || {}),
        };
        const rawStep = STEP_ORDER.includes(parsed.currentStep)
          ? (parsed.currentStep as WizardStepKey)
          : "verification";
        const safeStep = normalizeAllowedStep(rawStep, parsedFormData);

        currentMemoryState = {
          currentStep: safeStep,
          completedSteps: Array.isArray(parsed.completedSteps)
            ? parsed.completedSteps
            : [],
          formData: parsedFormData,
        };
      }
    }
  } catch {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

function updateStore(nextState: StoredWizardData) {
  currentMemoryState = nextState;
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    }
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

export function useSignupWizard() {
  const router = useRouter();

  // useSyncExternalStore guarantees 100% hydration matching without cascading setState in effects
  const wizardData = React.useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    },
    () => {
      initStorageOnce();
      return currentMemoryState;
    },
    () => DEFAULT_WIZARD_DATA
  );

  const isHydrated = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [globalError, setGlobalError] = React.useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = React.useState(false);

  const updateFormData = React.useCallback(
    (updates: Partial<SignupFormData>) => {
      const next: StoredWizardData = {
        ...currentMemoryState,
        formData: { ...currentMemoryState.formData, ...updates },
      };
      updateStore(next);
    },
    []
  );

  const markStepComplete = React.useCallback(
    (step: WizardStepKey) => {
      if (currentMemoryState.completedSteps.includes(step)) return;
      const next: StoredWizardData = {
        ...currentMemoryState,
        completedSteps: [...currentMemoryState.completedSteps, step],
      };
      updateStore(next);
    },
    []
  );

  const goToStep = React.useCallback(
    (nextStep: WizardStepKey) => {
      setGlobalError(null);
      const next: StoredWizardData = {
        ...currentMemoryState,
        currentStep: nextStep,
      };
      updateStore(next);
    },
    []
  );

  const goNext = React.useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(wizardData.currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      markStepComplete(wizardData.currentStep);
      goToStep(STEP_ORDER[currentIndex + 1]);
    }
  }, [wizardData.currentStep, markStepComplete, goToStep]);

  const goBack = React.useCallback(() => {
    setGlobalError(null);
    const currentIndex = STEP_ORDER.indexOf(wizardData.currentStep);

    if (currentIndex === 0) {
      router.push("/terms");
      return;
    }

    if (currentIndex > 0) {
      goToStep(STEP_ORDER[currentIndex - 1]);
    }
  }, [wizardData.currentStep, goToStep, router]);

  const resetWizard = React.useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
    updateStore(DEFAULT_WIZARD_DATA);
    setGlobalError(null);
  }, []);

  const getStepProgressNumber = React.useCallback((): number | null => {
    switch (wizardData.currentStep) {
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
  }, [wizardData.currentStep]);

  return {
    currentStep: wizardData.currentStep,
    completedSteps: wizardData.completedSteps,
    formData: wizardData.formData,
    isSubmitting,
    globalError,
    simulateFailure,
    isHydrated,
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

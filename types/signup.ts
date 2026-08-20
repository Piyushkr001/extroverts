export type WizardStepKey =
  | "verification"
  | "step1_profile"
  | "step2_location"
  | "step3_vibes"
  | "step4_social"
  | "success";

export interface SignupFormData {
  // Verification
  email: string;
  isEmailVerified: boolean;

  // Step 1: Basic Profile
  fullName: string;
  age: number | "";
  gender: string;

  // Step 2: Location & Campus / Work
  state: string;
  city: string;
  collegeOrWorkplace: string;

  // Step 3: Vibes & Hangout Style
  vibes: string[];
  hangoutStyle: string;

  // Step 4: Socials & Bio
  instagramHandle: string;
  bio: string;
  availability: string;
}

export interface SignupWizardState {
  currentStep: WizardStepKey;
  completedSteps: WizardStepKey[];
  isSubmitting: boolean;
  globalError: string | null;
  formData: SignupFormData;
  simulateFailure: boolean;
}

export interface LocationData {
  state: string;
  cities: {
    name: string;
    popularColleges: string[];
  }[];
}

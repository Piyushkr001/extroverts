import { SignupFormData } from "@/types/signup";

export const DEMO_VALID_OTP = "123456";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface ServiceResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export async function sendOtpMock(
  email: string,
  options?: { shouldFail?: boolean }
): Promise<ServiceResponse<{ demoOtp: string }>> {
  await sleep(900);

  if (options?.shouldFail || email.toLowerCase().includes("fail@")) {
    return {
      success: false,
      message:
        "Unable to send verification code. Please check your network or try a different email.",
    };
  }

  return {
    success: true,
    message: `Verification code sent to ${email}`,
    data: {
      demoOtp: DEMO_VALID_OTP,
    },
  };
}

export async function verifyOtpMock(
  email: string,
  otp: string,
  options?: { shouldFail?: boolean }
): Promise<ServiceResponse<{ verified: boolean }>> {
  await sleep(1000);

  if (options?.shouldFail || otp === "000000") {
    return {
      success: false,
      message: "Network error during verification. Please try again.",
    };
  }

  if (otp !== DEMO_VALID_OTP) {
    return {
      success: false,
      message: "Invalid verification code. Use the demo code '123456'.",
    };
  }

  return {
    success: true,
    message: "Email verified successfully!",
    data: {
      verified: true,
    },
  };
}

export async function submitFinalSignupMock(
  formData: SignupFormData,
  options?: { shouldFail?: boolean }
): Promise<ServiceResponse<{ userId: string; profile: SignupFormData }>> {
  await sleep(1200);

  if (options?.shouldFail) {
    return {
      success: false,
      message:
        "Failed to create profile due to simulated server error. Please try again.",
    };
  }

  return {
    success: true,
    message: "Welcome to Extroverts! Your profile has been created.",
    data: {
      userId: `extrovert_${Math.random().toString(36).substring(2, 9)}`,
      profile: formData,
    },
  };
}

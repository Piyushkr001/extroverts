import { z } from "zod";

export const emailVerificationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address (e.g. name@domain.com)"),
});

export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>;

export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "Please enter the complete 6-digit verification code")
    .regex(/^\d+$/, "Verification code must contain numeric digits only"),
});

export type OtpVerificationInput = z.infer<typeof otpVerificationSchema>;

export const stepOneProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .refine((val) => val.trim().length > 0, {
      message: "Full name cannot be whitespace only",
    }),
  age: z
    .number({
      message: "Please enter a valid age",
    })
    .int("Age must be a whole number")
    .min(18, "You must be at least 18 years old to join Extroverts")
    .max(100, "Please enter a valid age"),
  gender: z
    .string()
    .trim()
    .min(1, "Please select your gender or pronouns"),
});

export type StepOneProfileInput = z.infer<typeof stepOneProfileSchema>;

export const stepTwoLocationSchema = z.object({
  state: z.string().trim().min(1, "Please select your state"),
  city: z.string().trim().min(1, "Please select your city"),
  collegeOrWorkplace: z
    .string()
    .trim()
    .min(1, "College, university, or workplace is required")
    .min(2, "Must be at least 2 characters")
    .max(80, "Must not exceed 80 characters")
    .refine((val) => val.trim().length > 0, {
      message: "Field cannot be whitespace only",
    }),
});

export type StepTwoLocationInput = z.infer<typeof stepTwoLocationSchema>;

export const stepThreeVibesSchema = z.object({
  vibes: z
    .array(z.string())
    .min(2, "Please select at least 2 vibe interests to match with friends")
    .max(6, "You can select a maximum of 6 vibes"),
  hangoutStyle: z
    .string()
    .trim()
    .min(1, "Please select your preferred hangout group size/style"),
});

export type StepThreeVibesInput = z.infer<typeof stepThreeVibesSchema>;

export const stepFourSocialSchema = z.object({
  instagramHandle: z
    .string()
    .trim()
    .min(1, "Instagram / Social handle is required")
    .min(2, "Handle must be at least 2 characters")
    .max(30, "Handle cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Handle should only contain letters, numbers, dots, and underscores (omit @)"
    ),
  bio: z
    .string()
    .trim()
    .min(1, "Bio is required")
    .min(10, "Bio must be at least 10 characters to give others a sense of your vibe")
    .max(180, "Bio cannot exceed 180 characters")
    .refine((val) => val.trim().length >= 10, {
      message: "Bio cannot be mostly spaces; provide at least 10 characters",
    }),
  availability: z
    .string()
    .trim()
    .min(1, "Please select your typical hangout availability"),
});

export type StepFourSocialInput = z.infer<typeof stepFourSocialSchema>;

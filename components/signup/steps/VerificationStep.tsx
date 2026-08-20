"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Mail,
  Loader2,
  KeyRound,
  RefreshCw,
  Edit2,
  Bug,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { WizardHeader } from "../WizardHeader";
import {
  emailVerificationSchema,
  EmailVerificationInput,
  otpVerificationSchema,
} from "@/lib/validations/signup.schema";
import { sendOtpMock, verifyOtpMock, DEMO_VALID_OTP } from "@/lib/mock/signup-service";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface VerificationStepProps {
  initialEmail: string;
  demoMode?: boolean;
  onVerified: (email: string) => void;
  onBack: () => void;
}

export function VerificationStep({
  initialEmail,
  demoMode = false,
  onVerified,
  onBack,
}: VerificationStepProps) {
  const [subStage, setSubStage] = React.useState<"email" | "otp">(
    initialEmail ? "otp" : "email"
  );
  const [targetEmail, setTargetEmail] = React.useState(initialEmail || "");
  const [otpValue, setOtpValue] = React.useState("");
  const [otpError, setOtpError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resendCooldown, setResendCooldown] = React.useState(30);
  const [simulateFail, setSimulateFail] = React.useState(false);

  // Email form
  const {
    register,
    handleSubmit,
    formState: { errors: emailErrors },
    setError: setEmailError,
  } = useForm<EmailVerificationInput>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: initialEmail || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // Countdown timer for resend OTP
  React.useEffect(() => {
    if (subStage !== "otp" || resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [subStage, resendCooldown]);

  // Handle email submission
  const handleEmailSubmit = async (data: EmailVerificationInput) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await sendOtpMock(data.email, { shouldFail: simulateFail });
      if (response.success) {
        setTargetEmail(data.email);
        setOtpValue("");
        setOtpError(null);
        setSubStage("otp");
        setResendCooldown(30);
      } else {
        setEmailError("email", { message: response.message });
      }
    } catch {
      setEmailError("email", { message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    // Validate using Zod schema
    const parseResult = otpVerificationSchema.safeParse({ otp: otpValue });
    if (!parseResult.success) {
      setOtpError(
        parseResult.error.issues[0]?.message ||
          "Please enter all 6 numeric digits of the verification code."
      );
      return;
    }

    setOtpError(null);
    setIsSubmitting(true);
    try {
      const response = await verifyOtpMock(targetEmail, otpValue, {
        shouldFail: simulateFail,
      });
      if (response.success) {
        onVerified(targetEmail);
      } else {
        setOtpError(response.message);
      }
    } catch {
      setOtpError("Verification request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await sendOtpMock(targetEmail, { shouldFail: simulateFail });
      if (response.success) {
        setResendCooldown(30);
        setOtpError(null);
        setOtpValue("");
      } else {
        setOtpError(response.message);
      }
    } catch {
      setOtpError("Failed to resend code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <WizardHeader
        title={subStage === "email" ? "Enter your email" : "Verify your email"}
        subtitle={
          subStage === "email"
            ? "We'll send you a 6-digit verification code to confirm your account."
            : `We sent a 6-digit verification code to ${targetEmail}`
        }
        onBack={subStage === "otp" ? () => setSubStage("email") : onBack}
        showBack={true}
      />

      {/* Stage 1: Email Input */}
      {subStage === "email" ? (
        <form
          onSubmit={handleSubmit(handleEmailSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Email Address <span className="text-violet-600 dark:text-violet-400">*</span>
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                disabled={isSubmitting}
                className={cn(
                  "h-11 rounded-xl pl-9 text-sm transition-all",
                  emailErrors.email &&
                    "border-destructive focus-visible:ring-destructive/30"
                )}
                aria-invalid={!!emailErrors.email}
                aria-describedby={emailErrors.email ? "email-error" : undefined}
                {...register("email")}
              />
            </div>
            {emailErrors.email && (
              <p
                id="email-error"
                role="alert"
                className="text-xs font-medium text-destructive"
              >
                {emailErrors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-12 rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending code...
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        /* Stage 2: OTP Verification */
        <form onSubmit={handleOtpVerify} className="flex flex-col gap-4" noValidate>
          {/* Target Email change badge */}
          <div className="flex items-center justify-between rounded-xl border border-violet-500/20 bg-violet-500/5 px-3 py-2 text-xs">
            <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">
              {targetEmail}
            </span>
            <button
              type="button"
              onClick={() => {
                setSubStage("email");
                setOtpValue("");
                setOtpError(null);
              }}
              className="flex items-center gap-1 text-[11px] font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              <Edit2 className="h-3 w-3" />
              <span>Change</span>
            </button>
          </div>

          {/* OTP Input Fields */}
          <div className="flex flex-col items-center gap-2 py-2">
            <Label htmlFor="otp-input" className="sr-only">
              6-digit verification code
            </Label>
            <InputOTP
              id="otp-input"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              inputMode="numeric"
              value={otpValue}
              onChange={(val) => {
                setOtpValue(val);
                if (otpError) setOtpError(null);
              }}
              disabled={isSubmitting}
              autoFocus
            >
              <InputOTPGroup className="gap-1 min-[360px]:gap-1.5 sm:gap-2">
                <InputOTPSlot index={0} className="h-11 w-8 min-[360px]:w-10 sm:h-12 sm:w-11 rounded-xl text-sm sm:text-base font-bold" />
                <InputOTPSlot index={1} className="h-11 w-8 min-[360px]:w-10 sm:h-12 sm:w-11 rounded-xl text-sm sm:text-base font-bold" />
                <InputOTPSlot index={2} className="h-11 w-8 min-[360px]:w-10 sm:h-12 sm:w-11 rounded-xl text-sm sm:text-base font-bold" />
                <InputOTPSlot index={3} className="h-11 w-8 min-[360px]:w-10 sm:h-12 sm:w-11 rounded-xl text-sm sm:text-base font-bold" />
                <InputOTPSlot index={4} className="h-11 w-8 min-[360px]:w-10 sm:h-12 sm:w-11 rounded-xl text-sm sm:text-base font-bold" />
                <InputOTPSlot index={5} className="h-11 w-8 min-[360px]:w-10 sm:h-12 sm:w-11 rounded-xl text-sm sm:text-base font-bold" />
              </InputOTPGroup>
            </InputOTP>

            {demoMode && (
              <div className="mt-1 flex items-center justify-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-[11px] font-medium text-violet-700 dark:text-violet-300">
                <KeyRound className="h-3 w-3 text-violet-500" />
                <span>Evaluation Demo Code:</span>
                <strong className="font-mono font-bold">{DEMO_VALID_OTP}</strong>
              </div>
            )}

            {otpError && (
              <p
                role="alert"
                className="text-center text-xs font-medium text-destructive mt-1"
              >
                {otpError}
              </p>
            )}
          </div>


          {/* Action Button */}
          <Button
            type="submit"
            disabled={isSubmitting || otpValue.length < 6}
            className="mt-2 h-12 rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <span>Verify & Continue</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {/* Resend OTP */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Didn&apos;t receive the code?</span>
            {resendCooldown > 0 ? (
              <span className="font-mono font-medium text-violet-600 dark:text-violet-400">
                Resend in {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isSubmitting}
                className="flex items-center gap-1 font-semibold text-violet-600 hover:underline dark:text-violet-400"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Resend Code</span>
              </button>
            )}
          </div>
        </form>
      )}

      {/* Evaluator Simulation Control (Only in demo mode /signup?demo=true) */}
      {demoMode && (
        <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-[11px] text-zinc-400 dark:border-white/10">
          <span className="flex items-center gap-1">
            <Bug className="h-3 w-3" />
            <span>Demo Mode — Simulate Network Failure:</span>
          </span>
          <button
            type="button"
            onClick={() => setSimulateFail((prev) => !prev)}
            className={cn(
              "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase transition-colors",
              simulateFail
                ? "bg-red-500 text-white"
                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            )}
          >
            {simulateFail ? "ON (Failing)" : "OFF (Normal)"}
          </button>
        </div>
      )}
    </div>
  );
}

# Extroverts — Signup Wizard Replication

**Frontend Engineering Assessment Submission**

A modern, responsive, mobile-first social onboarding experience built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**.

---

## 🚀 Live Onboarding Flow

```text
Landing Screen (/) 
  └──> Terms & Conditions (/terms)
         └──> Email & OTP Verification Gate (/signup)
                └──> Step 1: Basic Profile (Name, Age 18+, Gender)
                       └──> Step 2: Location & Work (State -> City -> College)
                              └──> Step 3: Vibe Interests (Multi-select, Group Style)
                                     └──> Step 4: Socials & Bio (Handle, Bio Counter, Availability)
                                            └──> Profile Setup Complete Success State
```

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + `shadcn` theme tokens
- **UI & Primitives**: Base UI (`@base-ui/react`), Lucide React
- **Forms & Validation**: React Hook Form (`^7.85`), Zod (`^4.4`), `@hookform/resolvers`
- **Theme**: `next-themes` (Dark Mode, Light Mode, System support)
- **Typography**: Poppins (`next/font/google`)

---

## ✨ Key Features & Architectural Highlights

### 1. Multi-Step Signup Wizard
- **Gated Onboarding**: Profile details unlock only after verified email authentication. Direct `/signup` access without accepted terms redirects safely to `/terms`.
- **Backward & Forward Navigation**: Seamless step navigation preserving previously entered data.
- **Hydration Safety**: Built with `useSyncExternalStore` ensuring 100% deterministic SSR/client hydration without cascading re-renders.
- **Session State Recovery**: Safe `sessionStorage` synchronization with corrupted data fallbacks and Zod-powered step-normalization guards.

### 2. Validation & Guardrails
- **Age Restriction ($\ge 18$)**: Immediate contextual guidance and schema enforcement preventing $< 18$ registration.
- **Dependent Location Cascade**: State selection populates cities; modifying parent State or City automatically resets dependent descendants.
- **Input Constraints**: Aligned HTML `maxLength` limits with Zod schemas across all text inputs and textareas.
- **Live Character Counter**: Bio counter ($10 - 180$ chars) with dynamic threshold styling.
- **Numeric-Only OTP**: 6-digit `InputOTP` enforcing `REGEXP_ONLY_DIGITS`, numeric inputMode, auto-focus, and paste support.

### 3. Asynchronous Simulation & Error Handling
- **Frontend-Only Simulation**: Simulated network latency ($800\text{ms} - 1200\text{ms}$) with zero external backend dependencies.
- **Duplicate Submission Protection**: Asynchronous action buttons disabled with spinner states during active network calls.
- **Two-Tier Error Architecture**:
  - *Field-level errors*: Displayed inline directly beneath the affected input with `role="alert"`.
  - *Global submission errors*: Presented via top-level alert banners in the wizard shell.
- **Demo Mode Controls**: Hidden by default for production fidelity; available via `/signup?demo=true` for testing deterministic failure handling.

### 4. Accessibility & Responsive Design
- **Semantics**: Accessible `<form>`, `<label>`, `role="radiogroup"`, `role="radio"`, `role="checkbox"`, `aria-checked`, `aria-invalid`, and `aria-describedby`.
- **Keyboard Navigation**: Full tab index flow, keyboard enter submission, and visible focus rings.
- **Breakpoints Tested**: $320\text{px}$, $375\text{px}$, $430\text{px}$, $640\text{px}$, $768\text{px}$, $1024\text{px}$, $1440\text{px}$.

---

## 🔑 Demo Credentials & Testing Modes

| Mode / Feature | URL / Value | Notes |
| :--- | :--- | :--- |
| **Standard Production Mode** | `/signup` | Clean, production-fidelity UI without testing clutter |
| **Evaluator Demo Mode** | `/signup?demo=true` | Displays subtle toggles for simulating failure states |
| **Demo OTP Code** | `123456` | Valid 6-digit verification code |
| **Simulated Email Failure** | `fail@example.com` | Deterministically tests network failure on email step |

---

## 💻 Getting Started Locally

```bash
# 1. Install dependencies
bun install

# 2. Run local development server
bun dev

# 3. Run linting & type checks
bun run lint
bun x tsc --noEmit

# 4. Production build
bun run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

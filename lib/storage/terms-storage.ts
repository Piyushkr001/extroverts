import * as React from "react";

const TERMS_STORAGE_KEY = "extroverts_terms_accepted";

const termsListeners = new Set<() => void>();

function getTermsAcceptedSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(TERMS_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function useTermsAccepted(): boolean {
  return React.useSyncExternalStore(
    (callback) => {
      termsListeners.add(callback);
      return () => {
        termsListeners.delete(callback);
      };
    },
    getTermsAcceptedSnapshot,
    () => false
  );
}

export function setTermsAcceptedInStorage(accepted: boolean) {
  try {
    if (typeof window !== "undefined") {
      if (accepted) {
        sessionStorage.setItem(TERMS_STORAGE_KEY, "true");
      } else {
        sessionStorage.removeItem(TERMS_STORAGE_KEY);
      }
    }
  } catch {
    // ignore
  }
  termsListeners.forEach((listener) => listener());
}

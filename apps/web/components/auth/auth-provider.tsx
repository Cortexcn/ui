import type { ReactNode } from "react";

/**
 * Public stand-in for the sign-in provider. Sign-in runs on a private
 * backend, so the public repository renders the page as is.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  return children;
}

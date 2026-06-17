"use client";

import { useTheme } from "@/lib/useTheme";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const { mounted } = useTheme();

  // Prevent hydration mismatch by not rendering until client-side
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

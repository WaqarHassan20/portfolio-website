"use client";
import { useLayoutEffect, useState, useTransition } from "react";
import BootLoader1 from "./BootLoader1";


/**
 * Detect the type of page navigation using the Performance API
 * Returns the navigation type for hard page loads.
 */
function getNavigationType():
  | "navigate"
  | "reload"
  | "back_forward"
  | undefined {
  try {
    const navEntry =
      performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (navEntry && navEntry.type) {
      return navEntry.type as "navigate" | "reload" | "back_forward";
    }
  } catch {
    // Silently fail in browsers without Performance API
  }
  return undefined;
}

export default function BootLoaderGate({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always start as null so server + first client render are identical (no loader shown).
  // After mount, check if we should show the loader (first visit or page reload)
  const [active, setActive] = useState<"loader1" | "loader2" | null>(null);
  const [done, setDone] = useState(false);
  const [, startTransition] = useTransition();

  useLayoutEffect(() => {
    // Detect navigation type on hard page loads.
    // For full loads/reloads, always show loader.
    const navType = getNavigationType();
    const shouldShowLoader =
      navType === undefined ||
      navType === "navigate" ||
      navType === "reload" ||
      navType === "back_forward";

    if (!shouldShowLoader) {
      // No loader for this navigation path.
      return;
    }

    startTransition(() => {
      setActive("loader1");
    });
  }, []);

  return (
    <>
      {children}

      {!done && active === "loader1" && (
        <BootLoader1
          onDone={() => {
            setDone(true);
          }}
        />
      )}
    </>
  );
}

"use client";
import { useLayoutEffect, useState, useTransition } from "react";
import BootLoader1 from "./BootLoader1";
import BootLoader2 from "./BootLoader2";

const STORAGE_KEY = "portfolio_loader";
const LOADER_SEEN_KEY = "portfolio_loader_seen";

declare global {
  interface Window {
    __portfolioLoaderSeen?: boolean;
  }
}

export default function BootLoaderGate({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always start as null so server + first client render are identical (no loader shown).
  // After mount, read localStorage and show the correct loader.
  const [active, setActive] = useState<"loader1" | "loader2" | null>(null);
  const [done, setDone] = useState(false);
  const [, startTransition] = useTransition();

  useLayoutEffect(() => {
    if (window.__portfolioLoaderSeen) {
      setDone(true);
      return;
    }

    if (localStorage.getItem(LOADER_SEEN_KEY) === "1") {
      window.__portfolioLoaderSeen = true;
      setDone(true);
      return;
    }

    window.__portfolioLoaderSeen = true;

    const stored = localStorage.getItem(STORAGE_KEY);
    const loader =
      stored === "loader1" || stored === "loader2" ? stored : "loader1";
    startTransition(() => {
      setActive(loader);
    });
  }, []);

  return (
    <>
      {children}

      {!done && active === "loader1" && (
        <BootLoader1
          onDone={() => {
            localStorage.setItem(LOADER_SEEN_KEY, "1");
            setDone(true);
          }}
        />
      )}
      {!done && active === "loader2" && (
        <BootLoader2
          onDone={() => {
            localStorage.setItem(LOADER_SEEN_KEY, "1");
            setDone(true);
          }}
        />
      )}
    </>
  );
}

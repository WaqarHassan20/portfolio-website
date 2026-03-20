"use client";
import { useLayoutEffect, useState, useTransition } from "react";
import BootLoader1 from "./BootLoader1";
import BootLoader2 from "./BootLoader2";

const STORAGE_KEY = "portfolio_loader";

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
        <BootLoader1 onDone={() => setDone(true)} />
      )}
      {!done && active === "loader2" && (
        <BootLoader2 onDone={() => setDone(true)} />
      )}
    </>
  );
}

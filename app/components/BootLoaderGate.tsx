"use client";
import { useEffect, useState } from "react";
import BootLoader1 from "./BootLoader1";
import BootLoader2 from "./BootLoader2";

const STORAGE_KEY = "portfolio_loader";

export default function BootLoaderGate({ children }: { children: React.ReactNode }) {
  // Always start as null so server + first client render are identical (no loader shown).
  // After mount, read localStorage and show the correct loader.
  const [active, setActive] = useState<"loader1" | "loader2" | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as "loader1" | "loader2" | null;
    setActive(stored ?? "loader1");
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

"use client";
import {  useState } from "react";
import BootLoader1 from "./BootLoader1";
import BootLoader2 from "./BootLoader2";

const STORAGE_KEY = "portfolio_loader";

export default function BootLoaderGate({ children }: { children: React.ReactNode }) {
  // null on server and first client render — localStorage read only after mount
  const [active] = useState<"loader1" | "loader2">(() => {
    if (typeof window === "undefined") return "loader1";
    return (localStorage.getItem(STORAGE_KEY) as "loader1" | "loader2") ?? "loader1";
  });
  const [done, setDone] = useState(false);

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

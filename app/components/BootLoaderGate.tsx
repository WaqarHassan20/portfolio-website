"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import BootLoader1 from "./BootLoader1";

export default function BootLoaderGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  // If on landing page, start with loader active. Otherwise, skip it.
  const [active] = useState<"loader1" | null>(isLandingPage ? "loader1" : null);
  const [done, setDone] = useState(!isLandingPage);

  return (
    <>
      <div
        style={{
          opacity: done ? 1 : 0,
          visibility: done ? "visible" : "hidden",
          transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </div>

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

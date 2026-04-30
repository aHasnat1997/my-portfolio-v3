"use client";

import { useEffect, useState } from "react";

export default function AfterVideo({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      setDone((e as CustomEvent).detail >= 1);
    };
    window.addEventListener("videoProgress", handler);
    return () => window.removeEventListener("videoProgress", handler);
  }, []);

  return (
    <div
      className="transition-opacity duration-700"
      style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}
    >
      {children}
    </div>
  );
}

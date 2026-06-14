"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog } from "@/lib/posthog-client";

/**
 * Client component that initialises PostHog once and re-fires a pageview on
 * every soft navigation. Wrap the app root with this (inside RootProvider).
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialise once on mount.
  useEffect(() => {
    initPostHog();
  }, []);

  // Capture a pageview on each navigation (history_change handles SPA navs, but
  // an explicit call here is belt-and-suspenders for the initial server-render).
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== "undefined") {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      import("posthog-js").then(({ default: posthog }) => {
        posthog.capture("$pageview", { $current_url: window.location.href });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return <>{children}</>;
}

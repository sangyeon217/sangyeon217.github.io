"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const url = search ? `${pathname}${search}` : pathname;
    window.gtag?.("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string, {
      page_path: url,
    });
  }, [pathname]);

  return null;
}

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasQuery = searchParams.size > 0;
    const url = hasQuery ? `${pathname}?${searchParams.toString()}` : pathname;
    window.gtag?.("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, FC } from "react";

export const GA_TRACKING_ID = "G-6B3JF8MB9J";

export const AnalyticsScript: FC = () => {
  useGoogleAnalytics();

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

function useGoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const search = searchParams.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);
}

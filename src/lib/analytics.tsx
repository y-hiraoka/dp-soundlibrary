"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, FC, Suspense } from "react";

export const GoogleAnalytics: FC<{ trackingId: string }> = ({ trackingId }) => {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner trackingId={trackingId} />
    </Suspense>
  );
};

const GoogleAnalyticsInner: FC<{ trackingId: string }> = ({ trackingId }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    window.gtag("config", trackingId, {
      page_path: url,
    });
  }, [pathname, searchParams, trackingId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

import { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { FC, ReactNode } from "react";
import "./global.css";
import { AudioController } from "../components/AudioController";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { Navigation } from "../components/Navigation";
import { GoogleAnalytics } from "../lib/analytics";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

const notosansjp = Noto_Sans_JP({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
});

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="ja" className={`${inter.variable} ${notosansjp.variable}`}>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics trackingId="G-6B3JF8MB9J" />
      )}
      <body className="bg-black font-sans text-black">
        <BackgroundGradient />
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 grid-rows-[1fr_auto] gap-4 p-3 md:grid-cols-[auto_1fr] md:px-6">
          <div className="hidden md:block">
            <div className="sticky top-3">
              <Navigation />
            </div>
          </div>
          <div className="min-w-0">{children}</div>
          <div className="sticky bottom-3 col-span-full">
            <AudioController />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: {
    absolute: "ポケモン Sound Library ループプレイヤー",
    template: "%s | ポケモン Sound Library ループプレイヤー",
  },
  description:
    "『ポケットモンスター』の BGM をゲームプレイ中のようにループして再生できる Web サイトです。作業用 BGM などに役立てることができます。",
  openGraph: {
    type: "website",
    title: "ポケモン Sound Library ループプレイヤー",
    description:
      "『ポケットモンスター』の BGM をゲームプレイ中のようにループして再生できる Web サイトです。作業用 BGM などに役立てることができます。",
  },
  twitter: {
    card: "summary",
  },
  metadataBase:
    process.env.NODE_ENV === "production"
      ? new URL("https://pokemon-soundlibrary.stin.ink")
      : null,
};

import { Inter, Noto_Sans_JP } from "next/font/google";
import { FC, ReactNode } from "react";
import "./global.css";
import { AudioController } from "../components/AudioController";
import { Providers } from "./providers";

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
      <body className="font-sans">
        <Providers>
          <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-4 bg-black px-6 py-4">
            <div>sidemenu</div>
            <div className="min-w-0">{children}</div>
            <div className="sticky bottom-4 col-span-full">
              <AudioController />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

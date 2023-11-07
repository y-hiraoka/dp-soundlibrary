import { FC, ReactNode } from "react";
import "./global.css";
import { AudioController } from "../components/AudioController";
import { Providers } from "./providers";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-4 bg-black px-6 py-4">
            <div>sidemenu</div>
            <div>{children}</div>
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

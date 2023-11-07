import { FC, ReactNode } from "react";
import "./global.css";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <div className="grid min-h-[12000px] grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
          <div>sidemenu</div>
          <div>{children}</div>
          <div className="sticky bottom-0 col-span-full">Footer</div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

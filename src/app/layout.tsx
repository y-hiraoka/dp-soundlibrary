import { FC, ReactNode } from "react";
import "./global.css";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

import { Metadata } from "next";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="space-y-8 rounded-lg border border-white/[18%] bg-white/[8%] p-8 text-sm text-contrast">
      <h2 className="text-lg font-bold">404 Not Found</h2>
      <p>ページが見つかりませんでした。</p>
    </div>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: "404 Not Found",
  description: "ページが見つかりませんでした。",
  robots: {
    index: false,
    follow: false,
  },
};

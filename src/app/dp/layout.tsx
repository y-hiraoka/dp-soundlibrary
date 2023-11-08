import { FC, ReactNode } from "react";
import { Filtering } from "../../components/Filtering";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="space-y-4">
      <div className="sticky top-3 md:top-4">
        <Filtering />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

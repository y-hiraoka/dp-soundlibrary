import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { Filtering } from "../../components/Filtering";
import { isSoundVersion } from "../../data/sound-type";

const Layout: FC<{
  params: { version: string };
  children: ReactNode;
}> = ({ params, children }) => {
  const upperVersionParam = params.version.toUpperCase();

  if (!isSoundVersion(upperVersionParam)) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-3">
        <Filtering version={upperVersionParam} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

import { notFound } from "next/navigation";
import { FC } from "react";
import { Filtering } from "../../components/Filtering";
import { isSoundVersion } from "../../data/sound-type";

const Layout: FC<LayoutProps<"/[version]">> = async ({ params, children }) => {
  const { version } = await params;
  const upperVersionParam = version.toUpperCase();

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

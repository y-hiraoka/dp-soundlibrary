import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";
import { FilteredSoundList } from "../../components/SoundList";
import { SoundVersion, isSoundVersion } from "../../data/sound-type";

const Page: FC<PageProps<"/[version]">> = async ({ params }) => {
  const { version } = await params;
  const upperVersionParam = version.toUpperCase();

  if (isSoundVersion(upperVersionParam)) {
    return <FilteredSoundList version={upperVersionParam} />;
  }
};

export default Page;

export async function generateStaticParams(): Promise<{ version: string }[]> {
  return ["rg", "dp"].map((version) => ({ version }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[version]">): Promise<Metadata> {
  const { version } = await params;

  const versionTitleMap: Record<SoundVersion, string> = {
    RG: "赤・緑",
    DP: "ダイヤモンド・パール",
  };

  const upperVersionParam = version.toUpperCase();

  if (!isSoundVersion(upperVersionParam)) {
    notFound();
  }

  return {
    title: versionTitleMap[upperVersionParam],
    alternates: {
      canonical: `/${upperVersionParam.toLowerCase()}`,
    },
  };
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";
import { FilteredSoundList } from "../../components/SoundList";
import { SoundVersion, isSoundVersion } from "../../data/sound-type";

type Props = {
  params: { version: string };
};

const Page: FC<Props> = ({ params }) => {
  const upperVersionParam = params.version.toUpperCase();

  if (isSoundVersion(upperVersionParam)) {
    return <FilteredSoundList version={upperVersionParam} />;
  }
};

export default Page;

export async function generateStaticParams(): Promise<{ version: string }[]> {
  return ["rg", "dp"].map((version) => ({ version }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const versionTitleMap: Record<SoundVersion, string> = {
    RG: "赤・緑",
    DP: "ダイヤモンド・パール",
  };

  const upperVersionParam = params.version.toUpperCase();

  if (!isSoundVersion(upperVersionParam)) {
    notFound();
  }

  return {
    title: versionTitleMap[upperVersionParam],
  };
}

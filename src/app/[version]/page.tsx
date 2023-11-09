import { FC } from "react";
import { FilteredSoundList } from "../../components/SoundList";
import { isSoundVersion } from "../../data/sound-type";

const Page: FC<{ params: { version: string } }> = ({ params }) => {
  const upperVersionParam = params.version.toUpperCase();

  if (isSoundVersion(upperVersionParam)) {
    return <FilteredSoundList version={upperVersionParam} />;
  }
};

export default Page;

export async function generateStaticParams(): Promise<{ version: string }[]> {
  return ["rg", "dp"].map((version) => ({ version }));
}

export type SoundData = {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  file: string;
  loopStart?: number;
  loopEnd?: number;
  wip?: true;
  version: "RG" | "DP";
};

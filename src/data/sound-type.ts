export type SoundVersion = "RG" | "DP";

export function isSoundVersion(str: string): str is SoundVersion {
  return ["RG", "DP"].includes(str);
}

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
  version: SoundVersion;
};

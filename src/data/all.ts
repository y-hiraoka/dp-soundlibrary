import { dp_sounds } from "./dp";
import { rg_sounds } from "./rg";
import { SoundData, SoundVersion } from "./sound-type";

export const soundsVersionMap: Record<SoundVersion, readonly SoundData[]> = {
  DP: dp_sounds,
  RG: rg_sounds,
};

export const allSounds: readonly SoundData[] = Object.values(soundsVersionMap).flat();

export const categoriesMap: Record<SoundVersion, string[]> = {
  DP: [...new Set(dp_sounds.map((s) => s.category))],
  RG: [...new Set(rg_sounds.map((s) => s.category))],
};

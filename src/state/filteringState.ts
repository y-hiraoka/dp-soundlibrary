import { atomFamily, selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";
import { soundsVersionMap } from "../data/all";
import { SoundData, SoundVersion } from "../data/sound-type";

const activeCategoriesAtom = atomFamily<string[], SoundVersion>({
  key: "activeCategoriesAtom",
  default: [],
});
export const useActiveCategories = (version: SoundVersion): string[] =>
  useRecoilValue(activeCategoriesAtom(version));
export const useToggleActiveCategory = (
  version: SoundVersion,
): ((category: string) => void) =>
  useRecoilCallback(
    ({ set }) =>
      (category: string) => {
        set(activeCategoriesAtom(version), (prevState) => {
          if (prevState.includes(category)) {
            return prevState.filter((c) => c !== category);
          } else {
            return prevState.concat(category);
          }
        });
      },
    [version],
  );

const filteredSoundsSelector = selectorFamily({
  key: "filteredSoundsSelector",
  get:
    (version: SoundVersion) =>
    ({ get }) => {
      const activeCategories = get(activeCategoriesAtom(version));
      const sounds = soundsVersionMap[version];

      if (activeCategories.length === 0) {
        return sounds;
      } else {
        return sounds.filter((sound) => activeCategories.includes(sound.category));
      }
    },
});

export const useFilteredSounds = (version: SoundVersion): readonly SoundData[] =>
  useRecoilValue(filteredSoundsSelector(version));

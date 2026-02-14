import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai-family";
import { soundsVersionMap } from "../data/all";
import { SoundData, SoundVersion } from "../data/sound-type";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const activeCategoriesAtomFamily = atomFamily((_version: SoundVersion) =>
  atom<string[]>([]),
);

const filteredSoundsAtomFamily = atomFamily((version: SoundVersion) =>
  atom((get) => {
    const activeCategories = get(activeCategoriesAtomFamily(version));
    const sounds = soundsVersionMap[version];

    if (activeCategories.length === 0) {
      return sounds;
    } else {
      return sounds.filter((sound) => activeCategories.includes(sound.category));
    }
  }),
);

const toggleActiveCategoryAtomFamily = atomFamily((version: SoundVersion) =>
  atom(null, (get, set, category: string) => {
    set(activeCategoriesAtomFamily(version), (prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((c) => c !== category);
      } else {
        return prevState.concat(category);
      }
    });
  }),
);

export const useActiveCategories = (version: SoundVersion): string[] =>
  useAtomValue(activeCategoriesAtomFamily(version));

export const useToggleActiveCategory = (
  version: SoundVersion,
): ((category: string) => void) =>
  useSetAtom(toggleActiveCategoryAtomFamily(version));

export const useFilteredSounds = (version: SoundVersion): readonly SoundData[] =>
  useAtomValue(filteredSoundsAtomFamily(version));

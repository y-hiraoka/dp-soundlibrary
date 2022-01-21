import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Fuse from "fuse.js";
import { sounds } from "../data/sounds";

export const categories = [...new Set(sounds.map((s) => s.category))];

const filteringTextAtom = atom<string>({
  key: "filteringTextAtom",
  default: "",
});
export const useFilteringText = () => useRecoilValue(filteringTextAtom);
export const useSetFilteringText = () => useSetRecoilState(filteringTextAtom);

const activeCategoriesAtom = atom<string[]>({
  key: "activeCategoriesAtom",
  default: [],
});
export const useActiveCategories = () => useRecoilValue(activeCategoriesAtom);
export const useSetActiveCategories = () => useSetRecoilState(activeCategoriesAtom);

const soundsFuse = new Fuse(sounds, { keys: ["title"] });

const filteredSoundsSelector = selector({
  key: "filteredSoundsSelector",
  get: ({ get }) => {
    const filteringText = get(filteringTextAtom);
    const activeCategories = get(activeCategoriesAtom);

    if (!filteringText) {
      if (activeCategories.length === 0) {
        return sounds;
      } else {
        return sounds.filter((sound) => activeCategories.includes(sound.category));
      }
    } else {
      const searched = soundsFuse.search(filteringText).map((element) => element.item);
      return activeCategories.length === 0
        ? searched
        : searched.filter((element) => activeCategories.includes(element.category));
    }
  },
});

const filteredSoundsCountSelector = selector({
  key: "filteredSoundsCountSelector",
  get: ({ get }) => {
    const filteredSounds = get(filteredSoundsSelector);
    return filteredSounds.length;
  },
});

const soundsAreFilteredSelector = selector({
  key: "isFilteringSelector",
  get: ({ get }) => {
    const filteringText = get(filteringTextAtom);
    const activeCategories = get(activeCategoriesAtom);

    return !!filteringText || activeCategories.length !== 0;
  },
});

export const useFilteredSounds = () => useRecoilValue(filteredSoundsSelector);
export const useFilteredSoundsCount = () => useRecoilValue(filteredSoundsCountSelector);
export const useSoundsAreFiltered = () => useRecoilValue(soundsAreFilteredSelector);
export const useResetFiltering = () =>
  useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(filteringTextAtom);
        reset(activeCategoriesAtom);
      },
    []
  );

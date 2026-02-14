import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomFamily } from "jotai-family";
import { useMemo } from "react";
import { allSounds } from "../data/all";
import { SoundData } from "../data/sound-type";

const STORAGE_KEY = "__dp-soundlibrary-favorites-key";

const favoritesAtom = atomWithStorage<string[]>(STORAGE_KEY, []);

const isFavoriteSoundAtomFamily = atomFamily((soundId: string) =>
  atom((get) => {
    const favorites = get(favoritesAtom);
    return favorites.includes(soundId);
  }),
);

const toggleFavoriteAtom = atom(null, (get, set, soundId: string) => {
  set(favoritesAtom, (prevState) => {
    if (prevState.includes(soundId)) {
      return prevState.filter((fav) => fav !== soundId);
    } else {
      return prevState.concat(soundId);
    }
  });
});

export const useToggleFavorite = (): ((soundId: string) => void) => {
  return useSetAtom(toggleFavoriteAtom);
};

export const useIsFavoriteSound = (soundId: string): boolean => {
  return useAtomValue(isFavoriteSoundAtomFamily(soundId));
};

export const useFavoriteSounds = (): SoundData[] => {
  const favorites = useAtomValue(favoritesAtom);
  return useMemo(
    () =>
      favorites
        .map((soundId) => allSounds.find((sound) => sound.id === soundId))
        .filter((sound): sound is SoundData => sound !== undefined),
    [favorites],
  );
};

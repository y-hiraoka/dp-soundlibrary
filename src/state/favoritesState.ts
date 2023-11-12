import { useEffect, useMemo, FC } from "react";
import { useUpdateEffect } from "react-use";
import {
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { allSounds } from "../data/all";
import { SoundData } from "../data/sound-type";

const STORAGE_KEY = "__dp-soundlibrary-favorites-key";

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

const favoritesAtom = atom<string[]>({
  key: "favoritesAtom",
  default: [],
});

export const useToggleFavorite = (): ((soundId: string) => void) => {
  return useRecoilCallback(
    ({ set }) =>
      (soundId: string) => {
        set(favoritesAtom, (prevState) => {
          if (prevState.includes(soundId)) {
            return prevState.filter((fav) => fav !== soundId);
          } else {
            return prevState.concat(soundId);
          }
        });
      },
    [],
  );
};

const isFavoriteSoundSelectorFamily = selectorFamily({
  key: "isFavoriteSoundSelectorFamily",
  get:
    (soundId: string) =>
    ({ get }) => {
      const favorites = get(favoritesAtom);
      return favorites.includes(soundId);
    },
});

export const useIsFavoriteSound = (soundId: string): boolean => {
  return useRecoilValue(isFavoriteSoundSelectorFamily(soundId));
};

export const FavoritesEffect: FC = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesAtom);

  useEffect(() => {
    const storageValue = window.localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(storageValue ?? "[]");
    if (isStringArray(parsed)) {
      setFavorites(parsed);
    }
  }, [setFavorites]);

  useUpdateEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return null;
};

export const useFavoriteSounds = (): SoundData[] => {
  const favorites = useRecoilValue(favoritesAtom);
  return useMemo(
    () =>
      favorites
        .map((soundId) => allSounds.find((sound) => sound.id === soundId))
        .filter((sound): sound is SoundData => sound !== undefined),
    [favorites],
  );
};

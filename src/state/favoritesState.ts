import { useUpdateEffect } from "@chakra-ui/react";
import { useEffect, useMemo, VFC } from "react";
import {
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { sounds } from "../data/sounds";

const STORAGE_KEY = "__dp-soundlibrary-favorites-key";

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

const favoritesAtom = atom<string[]>({
  key: "favoritesAtom",
  default: [],
});

export const useToggleFavorite = () => {
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
    []
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

export const useIsFavoriteSound = (soundId: string) => {
  return useRecoilValue(isFavoriteSoundSelectorFamily(soundId));
};

export const FavoritesEffect: VFC = () => {
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

export const useFavoriteSounds = () => {
  const favorites = useRecoilValue(favoritesAtom);
  return useMemo(
    () => sounds.filter((sound) => favorites.includes(sound.id)),
    [favorites]
  );
};

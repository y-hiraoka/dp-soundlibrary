"use client";

import { FC } from "react";
import { SoundData, SoundVersion } from "../data/sound-type";
import { useCachedSounds } from "../lib/use-cached-sounds";
import { useIsOnline } from "../lib/use-is-online";
import { useFavoriteSounds } from "../state/favoritesState";
import { useFilteredSounds } from "../state/filteringState";
import { SoundItem } from "./SoundItem";

const SoundList: FC<{ sounds: readonly SoundData[] }> = ({ sounds }) => {
  const isOnline = useIsOnline();
  const cachedSounds = useCachedSounds();

  return (
    <ul className="space-y-4">
      {sounds.map((sound) => (
        <li key={sound.id}>
          <SoundItem
            sound={sound}
            isOnline={isOnline}
            cached={cachedSounds.includes(sound.file)}
          />
        </li>
      ))}
    </ul>
  );
};

export const FavoriteSoundList: FC = () => {
  const favoriteSounds = useFavoriteSounds();
  return <SoundList sounds={favoriteSounds} />;
};

export const FilteredSoundList: FC<{ version: SoundVersion }> = ({ version }) => {
  const filteredSounds = useFilteredSounds(version);
  return <SoundList sounds={filteredSounds} />;
};

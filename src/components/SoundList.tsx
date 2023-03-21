import { Box, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { SoundData } from "../data/sounds";
import { useCachedSounds } from "../lib/use-cached-sounds";
import { useIsOnline } from "../lib/use-is-online";
import { useFavoriteSounds } from "../state/favoritesState";
import { useFilteredSounds } from "../state/filteringState";
import { SoundItem } from "./SoundItem";

const SoundList: FC<{ sounds: readonly SoundData[] }> = ({ sounds }) => {
  const isOnline = useIsOnline();
  const cachedSounds = useCachedSounds();

  return (
    <Stack as="ul" maxW="full" spacing="4">
      {sounds.map((sound) => (
        <Box key={sound.id} as="li" listStyleType="none">
          <SoundItem
            sound={sound}
            isOnline={isOnline}
            cached={cachedSounds.includes(sound.file)}
          />
        </Box>
      ))}
    </Stack>
  );
};

export const FavoriteSoundList: FC = () => {
  const favoriteSounds = useFavoriteSounds();
  return <SoundList sounds={favoriteSounds} />;
};

export const FilteredSoundList: FC = () => {
  const filteredSounds = useFilteredSounds();
  return <SoundList sounds={filteredSounds} />;
};

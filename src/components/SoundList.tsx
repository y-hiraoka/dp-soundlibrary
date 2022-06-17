import { Box, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { SoundData } from "../data/sounds";
import { useFavoriteSounds } from "../state/favoritesState";
import { useFilteredSounds } from "../state/filteringState";
import { SoundItem } from "./SoundItem";

const SoundList: FC<{ sounds: readonly SoundData[] }> = ({ sounds }) => {
  return (
    <Stack as="ul" maxW="full" spacing="4">
      {sounds.map((sound) => (
        <Box key={sound.id} as="li" listStyleType="none">
          <SoundItem sound={sound} />
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

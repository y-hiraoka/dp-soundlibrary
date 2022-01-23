import { Box, Stack } from "@chakra-ui/react";
import { VFC } from "react";
import { SoundData } from "../data/sounds";
import { useFavoriteSounds } from "../state/favoritesState";
import { useFilteredSounds } from "../state/filteringState";
import { SoundItem } from "./SoundItem";

const SoundList: VFC<{ sounds: readonly SoundData[] }> = ({ sounds }) => {
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

export const FavoriteSoundList: VFC = () => {
  const favoriteSounds = useFavoriteSounds();
  return <SoundList sounds={favoriteSounds} />;
};

export const FilteredSoundList: VFC = () => {
  const filteredSounds = useFilteredSounds();
  return <SoundList sounds={filteredSounds} />;
};

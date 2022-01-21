import { Box, Stack } from "@chakra-ui/react";
import { VFC } from "react";
import { useFilteredSounds } from "../state/filteringState";
import { SoundItem } from "./SoundItem";

export const SoundList: VFC = () => {
  const filteredSounds = useFilteredSounds();

  return (
    <Stack as="ul" maxW="full" spacing="4">
      {filteredSounds.map((sound) => (
        <Box key={sound.id} as="li" listStyleType="none">
          <SoundItem sound={sound} />
        </Box>
      ))}
    </Stack>
  );
};

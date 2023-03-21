import {
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react";
import { memo, FC } from "react";
import { MdMusicNote, MdPlayArrow } from "react-icons/md";
import { SoundData } from "../data/sounds";
import { useAudioPlayer, useIsNowPlaying } from "../state/playerState";
import { FavoriteButton } from "./FavoriteButton";

type Props = {
  sound: SoundData;
  isOnline: boolean;
  cached: boolean;
};

export const SoundItem: FC<Props> = memo(({ sound, isOnline, cached }) => {
  const player = useAudioPlayer();
  const isNowPlaying = useIsNowPlaying(sound.id);

  const play = () => {
    player.start(sound);
    window.gtag("event", "start", {
      event_category: "Sounds",
      event_label: sound.id,
    });
  };

  const playButtonIsDisabled = !isOnline && !cached;

  return (
    <HStack
      spacing="4"
      borderRadius="xl"
      position="relative"
      bgColor="whiteAlpha.200"
      py="2"
      pl="4"
      pr="4"
      color={isNowPlaying ? "yellow.300" : "white"}
    >
      {isNowPlaying ? (
        <Center w="10" h="10">
          <Icon as={MdMusicNote} fontSize="2xl" />
        </Center>
      ) : (
        <IconButton
          borderRadius="full"
          bgColor="transparent"
          border="1px solid white"
          _hover={{
            bgColor: !playButtonIsDisabled ? "whiteAlpha.500" : "trasparent",
          }}
          _active={{
            bgColor: !playButtonIsDisabled ? "whiteAlpha.700" : "transparent",
          }}
          icon={<Icon as={MdPlayArrow} fontSize="xl" />}
          aria-label="再生スタート"
          onClick={play}
          isDisabled={playButtonIsDisabled}
        />
      )}
      <Stack spacing="1" flex={1}>
        <Text as="span" fontWeight="bold">
          {sound.title}
        </Text>
        <Divider as="div" />
        <Text as="span" fontSize="sm">
          {sound.category}
        </Text>
      </Stack>
      <Center>
        <FavoriteButton soundId={sound.id} />
      </Center>
    </HStack>
  );
});

if (process.env.NODE_ENV === "development") {
  SoundItem.displayName = "SoundItem";
}

import { HStack, Icon, IconButton, Stack, Text, Divider, Center } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { MdMusicNote, MdPlayArrow, MdStar } from "react-icons/md";
import { SoundData } from "../data/sounds";
import { useIsFavoriteSound, useToggleFavorite } from "../state/favoritesState";
import { useAudioPlayer, useIsNowPlaying } from "../state/playerState";

type Props = {
  sound: SoundData;
};

export const SoundItem: VFC<Props> = memo(({ sound }) => {
  const player = useAudioPlayer();
  const isNowPlaying = useIsNowPlaying(sound.id);
  const toggleFavorite = useToggleFavorite();
  const isFavoriteSound = useIsFavoriteSound(sound.id);

  const play = () => {
    player.start(sound);
    window.gtag("event", "start", {
      event_category: "Sounds",
      event_label: sound.id,
    });
  };

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
          _hover={{ bgColor: "whiteAlpha.500" }}
          _active={{ bgColor: "whiteAlpha.700" }}
          icon={<Icon as={MdPlayArrow} fontSize="xl" />}
          aria-label="再生スタート"
          onClick={play}
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
        <IconButton
          aria-label={isFavoriteSound ? "お気に入りを解除する" : "お気に入りに登録する"}
          icon={<Icon as={MdStar} fontSize="2xl" />}
          size="sm"
          bg="transparent"
          color={isFavoriteSound ? "yellow.300" : "whiteAlpha.500"}
          _hover={{ bgColor: "whiteAlpha.300" }}
          _active={{}}
          onClick={() => toggleFavorite(sound.id)}
        />
      </Center>
    </HStack>
  );
});

if (process.env.NODE_ENV === "development") {
  SoundItem.displayName = "SoundItem";
}

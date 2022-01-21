import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { VFC } from "react";
import {
  MdFilterList,
  MdPause,
  MdPlayArrow,
  MdShare,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import {
  useAudioPlayer,
  useAudioState,
  useNextSound,
  useNowPlayingSound,
  usePrevSound,
} from "../state/playerState";
import { FilteringDrawer } from "./FilteringDrawer";
import { TwitterShareLink } from "./TwitterShareLink";

export const AudioController: VFC = () => {
  const nowPlaying = useNowPlayingSound();
  const nextSound = useNextSound();
  const prevSound = usePrevSound();
  const player = useAudioPlayer();
  const audioState = useAudioState();

  const canShare =
    typeof window !== "undefined" &&
    window.navigator?.share !== undefined &&
    window.navigator?.canShare !== undefined &&
    window.navigator?.canShare();

  const sharingText =
    nowPlaying === undefined
      ? "『ポケットモンスター ダイヤモンド / パール』の BGM を無限ループで楽しもう！\n"
      : `『ポケットモンスター ダイヤモンド / パール』の BGM 「${nowPlaying.title}」 を聴こう！\n`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor="blackAlpha.900">
        <Container maxW="container.sm">
          <Flex alignItems="center" flexDirection="column" pt="2" pb="6">
            <Text
              as="span"
              fontWeight="bold"
              color="white"
              noOfLines={1}
              title={nowPlaying?.title}
            >
              {nowPlaying?.title}
            </Text>
            <Grid
              w="full"
              templateColumns="1fr auto 1fr"
              marginTop="4"
              alignItems="center"
            >
              <IconButton
                size="md"
                borderRadius="full"
                variant="ghost"
                color="white"
                justifySelf="start"
                _hover={{ background: "whiteAlpha.400" }}
                _active={{ background: "whiteAlpha.500" }}
                aria-label="フィルタリング設定を開く"
                icon={<Icon as={MdFilterList} fontSize="xl" />}
                onClick={onOpen}
              />
              <HStack spacing="4">
                <IconButton
                  size="md"
                  borderRadius="full"
                  variant="ghost"
                  color="white"
                  _hover={{ background: "whiteAlpha.400" }}
                  _active={{ background: "whiteAlpha.500" }}
                  aria-label="前の曲に戻る"
                  icon={<Icon fontSize="3xl" as={MdSkipPrevious} />}
                  onClick={() => player.start(prevSound)}
                />
                <IconButton
                  size="lg"
                  borderRadius="full"
                  aria-label="曲を再生する"
                  icon={
                    <Icon
                      fontSize="3xl"
                      as={
                        audioState.isPlaying
                          ? audioState.isPaused
                            ? MdPlayArrow
                            : MdPause
                          : MdPlayArrow
                      }
                    />
                  }
                  onClick={() =>
                    audioState.isPlaying
                      ? audioState.isPaused
                        ? player.resume()
                        : player.pause()
                      : player.start(nextSound)
                  }
                />
                <IconButton
                  size="md"
                  borderRadius="full"
                  variant="ghost"
                  color="white"
                  _hover={{ background: "whiteAlpha.400" }}
                  _active={{ background: "whiteAlpha.500" }}
                  aria-label="次の曲に進む"
                  icon={<Icon fontSize="3xl" as={MdSkipNext} />}
                  onClick={() => player.start(nextSound)}
                />
              </HStack>
              {canShare ? (
                <IconButton
                  size="md"
                  borderRadius="full"
                  variant="ghost"
                  color="white"
                  justifySelf="end"
                  _hover={{ background: "whiteAlpha.400" }}
                  _active={{ background: "whiteAlpha.500" }}
                  aria-label="このWebサイトをシェアする"
                  icon={<Icon as={MdShare} fontSize="xl" />}
                  onClick={() =>
                    navigator.share({
                      title: "Pokemon DP ループプレイヤー",
                      text: sharingText,
                      url: "https://dp-soundlibrary.stin.ink",
                    })
                  }
                />
              ) : (
                <IconButton
                  as={TwitterShareLink}
                  text={sharingText}
                  url="https://dp-soundlibrary.stin.ink"
                  hashtags={["ポケモンDP", "ポケモンBDSP"]}
                  aria-label="このWebサイトをTwitterでシェアする"
                  size="md"
                  borderRadius="full"
                  variant="ghost"
                  color="white"
                  justifySelf="end"
                  _hover={{ background: "whiteAlpha.400" }}
                  _active={{ background: "whiteAlpha.500" }}
                  icon={<Icon as={MdShare} fontSize="xl" />}
                />
              )}
            </Grid>
          </Flex>
        </Container>
      </Box>
      <FilteringDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

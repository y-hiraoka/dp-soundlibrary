import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { VFC } from "react";
import { MdPause, MdPlayArrow, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  useAudioPlayer,
  useAudioState,
  useNextSound,
  useNowPlayingSound,
  usePrevSound,
} from "../state/playerState";

const ShareButton = dynamic(() => import("./ShareButton"), { ssr: false });

export const AudioController: VFC = () => {
  const nowPlaying = useNowPlayingSound();
  const nextSound = useNextSound();
  const prevSound = usePrevSound();
  const player = useAudioPlayer();
  const audioState = useAudioState();

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
              _before={{ content: "''", display: "block" }}
            >
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
              <ShareButton />
            </Grid>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC, useCallback, useRef } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import { useKeybind } from "../lib/keybind";
import {
  useAudioPlayer,
  useAudioState,
  useNextSound,
  useNowPlayingSound,
  usePrevSound,
} from "../state/playerState";
import { FavoriteButton } from "./FavoriteButton";

const ShareButton = dynamic(() => import("./ShareButton"), { ssr: false });

export const AudioController: FC = () => {
  const shouldShowVolumeSlider = useBreakpointValue([false, true]); // スマホにボリューム調整要らんやろ
  const nowPlaying = useNowPlayingSound();
  const nextSound = useNextSound();
  const prevSound = usePrevSound();
  const player = useAudioPlayer();
  const audioState = useAudioState();
  const togglePlay = useCallback(() => {
    audioState.isPlaying
      ? audioState.isPaused
        ? player.resume()
        : player.pause()
      : player.start(nextSound);
  }, [audioState.isPaused, audioState.isPlaying, nextSound, player]);
  const playPrevSound = useCallback(
    () => player.start(prevSound),
    [player, prevSound]
  );
  const playNextSound = useCallback(
    () => player.start(nextSound),
    [nextSound, player]
  );

  useKeybind({
    key: " ",
    onKeyDown: togglePlay,
  });
  useKeybind({
    key: "ArrowRight",
    altKey: true,
    onKeyDown: playNextSound,
  });
  useKeybind({
    key: "ArrowLeft",
    altKey: true,
    onKeyDown: playPrevSound,
  });

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
              <Box justifySelf="start">
                {shouldShowVolumeSlider ? (
                  <VolumeSlider />
                ) : (
                  nowPlaying && <FavoriteButton soundId={nowPlaying.id} />
                )}
              </Box>
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
                  onClick={playPrevSound}
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
                  onClick={togglePlay}
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
                  onClick={playNextSound}
                />
              </HStack>
              <HStack justifySelf="end">
                {shouldShowVolumeSlider && nowPlaying !== undefined && (
                  <FavoriteButton soundId={nowPlaying.id} />
                )}
                <ShareButton />
              </HStack>
            </Grid>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

const VolumeSlider: FC = () => {
  const audioState = useAudioState();
  const player = useAudioPlayer();

  const previousVolumeRef = useRef<number>();

  const toggleMute = useCallback(() => {
    if (previousVolumeRef.current === undefined) {
      previousVolumeRef.current = audioState.volume;
      player.setVolume(0);
    } else {
      player.setVolume(previousVolumeRef.current);
      previousVolumeRef.current = undefined;
    }
  }, [audioState.volume, player]);

  useKeybind({
    key: "ArrowUp",
    altKey: true,
    onKeyDown: () => player.setVolume(audioState.volume + 0.01),
  });
  useKeybind({
    key: "ArrowDown",
    altKey: true,
    onKeyDown: () => player.setVolume(audioState.volume - 0.01),
  });

  return (
    <HStack spacing="1">
      <IconButton
        aria-label="show volume slider"
        onClick={toggleMute}
        variant="ghost"
        borderRadius="full"
        color="white"
        size="sm"
        _hover={{ background: "whiteAlpha.400" }}
        _active={{ background: "whiteAlpha.500" }}
        icon={
          <Icon
            as={
              audioState.volume === 0
                ? MdVolumeOff
                : audioState.volume < 0.33
                ? MdVolumeMute
                : audioState.volume < 0.66
                ? MdVolumeDown
                : MdVolumeUp
            }
            fontSize="3xl"
          />
        }
      />
      <Slider
        aria-label="ボリューム調整"
        onChange={(value) => player.setVolume(value)}
        focusThumbOnChange={false}
        value={audioState.volume}
        min={0}
        max={1}
        step={0.01}
        w="24"
        colorScheme="yellow"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </HStack>
  );
};

"use client";

import { FC, useCallback } from "react";
import {
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
  MdPause,
  MdPlayArrow,
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
import { IconButton } from "./IconButton";
import { NavigationDrawerButton } from "./NavigationDrawer";
import { ShareButton } from "./ShareButton";
import { VolumeSlider } from "./VolumeSlider";

export const AudioController: FC = () => {
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
  const playPrevSound = useCallback(() => player.start(prevSound), [player, prevSound]);
  const playNextSound = useCallback(() => player.start(nextSound), [nextSound, player]);

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

  const PlayButtonIcon = audioState.isPlaying
    ? audioState.isPaused
      ? MdPlayArrow
      : MdPause
    : MdPlayArrow;

  return (
    <div className="grid h-audio-controller grid-cols-[1fr_auto_1fr] items-center rounded-md border border-white/10 bg-black/80 px-2 py-3 backdrop-blur md:px-6">
      <div className="md:hidden">
        <NavigationDrawerButton />
      </div>
      <div className="hidden md:block">
        <VolumeSlider />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <p
          className="h-4 w-fit text-xs font-bold text-contrast"
          title={nowPlaying?.title}
        >
          {nowPlaying?.title}
        </p>
        <div className="flex items-center space-x-3">
          <IconButton
            icon={<MdOutlineSkipPrevious />}
            variant="ghost"
            onClick={playPrevSound}
            aria-label="前の曲に戻る"
          />
          <IconButton
            icon={<PlayButtonIcon />}
            variant="solid"
            aria-label="曲を再生する"
            onClick={togglePlay}
          />
          <IconButton
            icon={<MdOutlineSkipNext />}
            variant="ghost"
            onClick={playNextSound}
            aria-label="次の曲に進む"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-self-end">
        <div className="hidden md:block">
          {nowPlaying !== undefined && <FavoriteButton soundId={nowPlaying.id} />}
        </div>
        <ShareButton />
      </div>
    </div>
  );
};

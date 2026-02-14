import * as Slider from "@radix-ui/react-slider";
import { FC, useCallback, useRef } from "react";
import { MdVolumeDown, MdVolumeMute, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { useKeybind } from "../lib/keybind";
import { useAudioPlayer, useAudioState } from "../state/playerState";
import { IconButton } from "./IconButton";

export const VolumeSlider: FC = () => {
  const audioState = useAudioState();
  const player = useAudioPlayer();

  const previousVolumeRef = useRef<number | undefined>(undefined);

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

  const VolumeIcon =
    audioState.volume === 0
      ? MdVolumeOff
      : audioState.volume < 0.33
      ? MdVolumeMute
      : audioState.volume < 0.66
      ? MdVolumeDown
      : MdVolumeUp;

  return (
    <div className="flex items-center space-x-1">
      <IconButton
        icon={<VolumeIcon />}
        aria-label="ミュートを切り替える"
        onClick={toggleMute}
        size="sm"
        color="contrast"
        variant="ghost"
      />
      <Slider.Root
        aria-label="ボリューム調整"
        className="relative flex h-3 w-32 cursor-pointer touch-none select-none items-center"
        onValueChange={([value]) => player.setVolume(value)}
        value={[audioState.volume]}
        min={0}
        max={1}
        step={0.01}
      >
        <Slider.Track className="relative h-1 w-full grow rounded-full bg-white">
          <Slider.Range className="absolute h-full rounded-full bg-yellow" />
        </Slider.Track>
        <Slider.Thumb className="relative block size-4 rounded-full bg-white shadow-md shadow-black focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-yellow/30">
          <span className="relative -left-1.5 -top-1.5 block size-7 rounded-full" />
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};

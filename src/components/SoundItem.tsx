import classNames from "classnames";
import { memo, FC } from "react";
import { MdMusicNote, MdPlayArrow } from "react-icons/md";
import { SoundData } from "../data/sound-type";
import { useAudioPlayer, useIsNowPlaying } from "../state/playerState";
import { FavoriteButton } from "./FavoriteButton";
import { IconButton } from "./IconButton";

type Props = {
  sound: SoundData;
  isOnline: boolean;
  cached: boolean;
};

export const SoundItem: FC<Props> = memo(({ sound, isOnline, cached }) => {
  const player = useAudioPlayer();
  const isNowPlaying = useIsNowPlaying(sound.id);

  const playButtonIsDisabled = !isOnline && !cached;

  return (
    <div
      className={classNames(
        "flex items-center space-x-4 rounded-lg border bg-white/[8%] px-4 py-3",
        isNowPlaying ? "border-yellow/75" : "border-white/[18%]",
      )}
    >
      <IconButton
        size="sm"
        icon={isNowPlaying ? <MdMusicNote /> : <MdPlayArrow />}
        aria-label="再生スタート"
        onClick={() => player.start(sound)}
        disabled={playButtonIsDisabled}
        variant="outline"
      />
      <div className="flex-1 space-y-1">
        <span className={classNames("text-sm font-bold leading-none text-contrast")}>
          {sound.title}
        </span>
        <hr className={classNames("border-t border-white/50")} />
        <span className={classNames("text-xs leading-none text-contrast-sub")}>
          {sound.category}
        </span>
      </div>
      <FavoriteButton soundId={sound.id} />
    </div>
  );
});

if (process.env.NODE_ENV === "development") {
  SoundItem.displayName = "SoundItem";
}

import { FC } from "react";
import { MdShare } from "react-icons/md";
import { SoundVersion } from "../data/sound-type";
import { createIntentTweetLink } from "../lib/createIntentTweetLink";
import { useNowPlayingSound } from "../state/playerState";
import { IconButton } from "./IconButton";

const versionTitleMap: Record<SoundVersion, string> = {
  RG: "赤・緑",
  DP: "ダイヤモンド・パール",
};

const ShareButton: FC = () => {
  const nowPlaying = useNowPlayingSound();

  const canShare = typeof window !== "undefined" && window.navigator?.share !== undefined;

  const sharingText =
    nowPlaying === undefined
      ? "『ポケットモンスター』の BGM を無限ループで楽しもう！\n"
      : `『ポケットモンスター ${versionTitleMap[nowPlaying.version]}』の BGM 「${
          nowPlaying.title
        }」 を聴こう！\n`;

  return (
    <IconButton
      variant="ghost"
      color="contrast"
      aria-label={
        canShare ? "このWebサイトをシェアする" : "このWebサイトをTwitterでシェアする"
      }
      icon={<MdShare />}
      onClick={() => {
        if (canShare) {
          navigator.share({
            title: "Pokemon DP ループプレイヤー",
            text: sharingText,
            url: "https://dp-soundlibrary.stin.ink",
          });
        } else {
          window.open(
            createIntentTweetLink({
              text: sharingText,
              url: "https://dp-soundlibrary.stin.ink",
            }),
            "_blank",
            "noreferrer",
          );
        }
      }}
    />
  );
};

export default ShareButton;

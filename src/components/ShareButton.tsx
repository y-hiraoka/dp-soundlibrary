"use client";

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

export const ShareButton: FC = () => {
  const nowPlaying = useNowPlayingSound();

  const clickHandler = () => {
    const canShare =
      typeof window !== "undefined" && window.navigator?.share !== undefined;

    const sharingText =
      nowPlaying === undefined
        ? "『ポケットモンスター』の BGM を無限ループで楽しもう！\n"
        : `『ポケットモンスター ${versionTitleMap[nowPlaying.version]}』の BGM 「${
            nowPlaying.title
          }」 を聴こう！\n`;

    if (canShare) {
      navigator.share({
        title: "Pokemon Sound Library ループプレイヤー",
        text: sharingText,
        url: "https://pokemon-soundlibrary.stin.ink",
      });
    } else {
      window.open(
        createIntentTweetLink({
          text: sharingText,
          url: "https://pokemon-soundlibrary.stin.ink",
        }),
        "_blank",
        "noreferrer",
      );
    }
  };

  return (
    <IconButton
      variant="ghost"
      color="contrast"
      aria-label={"このWebサイトをシェアする"}
      icon={<MdShare />}
      onClick={clickHandler}
    />
  );
};

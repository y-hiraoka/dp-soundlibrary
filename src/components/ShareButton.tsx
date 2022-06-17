import { Icon, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { MdShare } from "react-icons/md";
import { useNowPlayingSound } from "../state/playerState";
import { TwitterShareLink } from "./TwitterShareLink";

const ShareButton: FC = () => {
  const nowPlaying = useNowPlayingSound();

  const canShare = typeof window !== "undefined" && window.navigator?.share !== undefined;

  const sharingText =
    nowPlaying === undefined
      ? "『ポケットモンスター ダイヤモンド / パール』の BGM を無限ループで楽しもう！\n"
      : `『ポケットモンスター ダイヤモンド / パール』の BGM 「${nowPlaying.title}」 を聴こう！\n`;

  return canShare ? (
    <IconButton
      size="md"
      borderRadius="full"
      variant="ghost"
      color="white"
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
      _hover={{ background: "whiteAlpha.400" }}
      _active={{ background: "whiteAlpha.500" }}
      icon={<Icon as={MdShare} fontSize="xl" />}
    />
  );
};

export default ShareButton;

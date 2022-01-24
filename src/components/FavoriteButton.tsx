import { Icon, IconButton } from "@chakra-ui/react";
import { VFC } from "react";
import { MdStar } from "react-icons/md";
import { useIsFavoriteSound, useToggleFavorite } from "../state/favoritesState";

export const FavoriteButton: VFC<{ soundId: string }> = ({ soundId }) => {
  const isFavoriteSound = useIsFavoriteSound(soundId);
  const toggleFavorite = useToggleFavorite();

  return (
    <IconButton
      aria-label={isFavoriteSound ? "お気に入りを解除する" : "お気に入りに登録する"}
      icon={<Icon as={MdStar} fontSize="2xl" />}
      size="sm"
      bg="transparent"
      color={isFavoriteSound ? "yellow.300" : "whiteAlpha.500"}
      _hover={{ bgColor: "whiteAlpha.300" }}
      _active={{}}
      onClick={() => toggleFavorite(soundId)}
    />
  );
};

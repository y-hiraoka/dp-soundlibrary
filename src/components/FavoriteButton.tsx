import { Icon, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { MdStar } from "react-icons/md";
import { useIsFavoriteSound, useToggleFavorite } from "../state/favoritesState";

export const FavoriteButton: FC<{ soundId: string }> = ({ soundId }) => {
  const isFavoriteSound = useIsFavoriteSound(soundId);
  const toggleFavorite = useToggleFavorite();

  return (
    <IconButton
      aria-label="お気に入り"
      role="checkbox"
      aria-checked={isFavoriteSound}
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

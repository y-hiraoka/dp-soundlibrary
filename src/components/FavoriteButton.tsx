import { FC } from "react";
import { MdStar, MdStarOutline } from "react-icons/md";
import { useIsFavoriteSound, useToggleFavorite } from "../state/favoritesState";
import { IconButton } from "./IconButton";

export const FavoriteButton: FC<{ soundId: string }> = ({ soundId }) => {
  const isFavoriteSound = useIsFavoriteSound(soundId);
  const toggleFavorite = useToggleFavorite();

  const StarIcon = isFavoriteSound ? MdStar : MdStarOutline;

  return (
    <IconButton
      aria-label="お気に入り"
      role="checkbox"
      aria-checked={isFavoriteSound}
      icon={<StarIcon />}
      variant="ghost"
      color={isFavoriteSound ? "yellow" : "contrast"}
      onClick={() => toggleFavorite(soundId)}
    />
  );
};

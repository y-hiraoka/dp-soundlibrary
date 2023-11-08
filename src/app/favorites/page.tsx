import type { NextPage } from "next";
import { FavoriteSoundList } from "../../components/SoundList";

const FavoritePage: NextPage = () => {
  return (
    <div className="space-y-4">
      <div className="w-full overflow-x-auto rounded-md border border-white/10 bg-black/80 p-4 backdrop-blur">
        <h2 className="text-sm font-bold text-contrast">お気に入り</h2>
        <p className="mt-2 text-xs text-contrast-sub">
          お気に入りの選択はこのブラウザにのみ保存されます。
        </p>
      </div>
      <FavoriteSoundList />
    </div>
  );
};

export default FavoritePage;

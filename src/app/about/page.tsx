import type { Metadata, NextPage } from "next";

const FavoritePage: NextPage = () => {
  return (
    <div className="space-y-8 rounded-lg border border-white/[18%] bg-white/[8%] p-8 text-sm text-contrast">
      <h2 className="text-lg font-bold">サイトについて</h2>
      <div className="space-y-4">
        <p>
          ©2023 Pokémon. ©1995-2023 Nintendo/Creatures Inc./GAME FREAK inc.
          <br />
          これは「Pokémon Game Sound Library」の利用規約に同意し作成されたコンテンツです。
        </p>
        <p>このサイトは Google Analytics を使用しています。</p>
      </div>
    </div>
  );
};

export default FavoritePage;

export const metadata: Metadata = {
  title: "サイトについて",
};

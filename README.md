# ポケモン DP Sound Library ループプレイヤー

https://dp-soundlibrary.stin.ink

## 説明

[Pokémon DP Sound Library](https://soundlibrary.pokemon.co.jp/) で配布されている『ポケットモンスター ダイヤモンド / パール』の BGM をループ区間を定めてループ再生できるサイトです。

ゲームをプレイ中の BGM のように途切れることなく再生されるので、作業 BGM 等にご活用いただけます。

## スタック

- Next.js
- Recoil
- Chakra UI

## 音声ファイルについて

[Pokémon DP Sound Library](https://soundlibrary.pokemon.co.jp/download) の規約によると、音声ファイルの再配布は禁止になっています。
GitHub の公開リポジトリは誰でもリソースのダウンロードが可能であり再配布に該当するため、音声ファイルは git コミット対象外にしています。

ソースコードをクローンして Web サイトの動作をローカルで試す場合は [Pokémon DP Sound Library](https://soundlibrary.pokemon.co.jp/download) にて音声ファイルをダウンロードし、[こちらの JSON](https://github.com/y-hiraoka/dp-soundlibrary/blob/main/src/data/sounds.ts) に沿ってファイル名を変更して `public` ディレクトリに保存してください。

```
public/sounds/1.wav
public/sounds/2.wav
...
public/sounds/149.wav
```

すべての音声ファイルを用意する必要はありませんが、ファイルが存在しない場合のエラーハンドリングはしていませんのでご了承ください。

## contribute

不具合の修正、デザインの修正、機能要望など気兼ねなく issue or pull-request 出していただいてかまいません。

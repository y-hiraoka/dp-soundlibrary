import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { AnalyticsScript, useGoogleAnalytics } from "../lib/analytics";
import { FavoritesEffect } from "../state/favoritesState";

const theme = extendTheme({
  shadows: { outline: "0 0 0 3px rgba(236, 201, 75, 0.6)" },
});

function MyApp({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();

  return (
    <>
      <AnalyticsScript />
      <Head>
        <title>ポケモンDP Sound Library ループプレイヤー</title>
        <meta name="theme-color" content="#000000eb" />
        <meta
          name="description"
          content="『ポケットモンスターダイヤモンド・パール』の BGM をゲームプレイ中のように
          ループして再生できる Web サイトです。作業用 BGM などに役立てることができます。"
        />
        <meta
          property="og:image"
          content="https://dp-soundlibrary.stin.ink/pokeball-with-bg.png"
        />
        <meta
          property="og:description"
          content="『ポケットモンスターダイヤモンド・パール』の BGM をゲームプレイ中のように
          ループして再生できる Web サイトです。作業用 BGM などに役立てることができます。"
        />
        <meta property="og:title" content="ポケモンDP Sound Library ループプレイヤー" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="ポケモンDP Sound Library ループプレイヤー"
        />
      </Head>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Box
            zIndex={0}
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg={`linear-gradient(
              to bottom right,
              hsl(211deg 85% 65%) 0%,
              hsl(207deg 67% 48%) 10%,
              hsl(205deg 100% 33%) 20%,
              hsl(210deg 100% 26%) 30%,
              hsl(217deg 100% 19%) 40%,
              hsl(0deg 0% 0%) 50%,
              hsl(328deg 100% 16%) 60%,
              hsl(334deg 48% 33%) 70%,
              hsl(336deg 34% 49%) 80%,
              hsl(337deg 49% 65%) 90%,
              hsl(338deg 100% 82%) 100%
            );`}
          />
          <Box zIndex={1} position="relative">
            <Component {...pageProps} />
          </Box>
          <FavoritesEffect />
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

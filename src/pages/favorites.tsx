import { Box, Grid, Container, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { AudioController } from "../components/AudioController";
import { FavoriteSoundList } from "../components/SoundList";
import { Navigation } from "../components/Navigation";

const FavoritePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>お気に入り | ポケモンDP Sound Library ループプレイヤー</title>
      </Head>
      <Grid as="main" minHeight="100vh" templateRows="auto auto 1fr auto">
        <Header />
        <Box position="sticky" top={0} zIndex={1}>
          <Navigation />
        </Box>
        <Container maxW="container.sm">
          <Heading color="white" fontSize="lg" mt="4">
            お気に入り BGM
          </Heading>
          <Text color="white" mt="4" fontSize="sm">
            お気に入りの選択はこのブラウザにのみ保存されます。
          </Text>
          <Box my="8">
            <FavoriteSoundList />
          </Box>
        </Container>
        <Box position="sticky" bottom={0}>
          <AudioController />
        </Box>
      </Grid>
    </>
  );
};

export default FavoritePage;

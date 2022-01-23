import { Box, Grid, Container, Text, Link, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Header } from "../components/Header";
import { AudioController } from "../components/AudioController";
import { FilteredSoundList } from "../components/SoundList";
import { Navigation } from "../components/Navigation";
import { Filtering } from "../components/Filtering";

const Home: NextPage = () => {
  return (
    <Grid as="main" minHeight="100vh" templateRows="auto auto 1fr auto">
      <Header />
      <Box position="sticky" top={0} zIndex={1}>
        <Navigation />
      </Box>
      <Container maxW="container.sm">
        <Heading color="white" fontSize="lg" mt="4">
          <Box as="span" display="inline-block">
            ポケモンDP Sound Library
          </Box>{" "}
          <Box as="span" display="inline-block">
            ループプレイヤー
          </Box>
        </Heading>
        <Text color="white" my="4" fontSize="sm">
          <Link isExternal href="https://soundlibrary.pokemon.co.jp/">
            Pokémon DP Sound Library
          </Link>{" "}
          で配布されている 『ポケットモンスターダイヤモンド・パール』の BGM
          をゲームプレイ中のようにループして再生できます。 作業 BGM 等にお役立てください。
        </Text>
        <Box mt="4" mb="8">
          <Filtering />
          <FilteredSoundList />
        </Box>
      </Container>
      <Box position="sticky" bottom={0}>
        <AudioController />
      </Box>
    </Grid>
  );
};

export default Home;

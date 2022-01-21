import { Box, Grid, Container, Text, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Header } from "../components/Header";
import { AudioController } from "../components/AudioController";
import { SoundList } from "../components/Sounds";

const Home: NextPage = () => {
  return (
    <Grid as="main" minHeight="100vh" gap="2" templateRows="auto 1fr auto">
      <Box position="sticky" top={0} zIndex={1}>
        <Header />
      </Box>
      <Container maxW="container.sm">
        <Text color="white" my="4" fontSize="sm">
          <Link isExternal href="https://soundlibrary.pokemon.co.jp/">
            Pokémon DP Sound Library
          </Link>{" "}
          で配布されている 『ポケットモンスターダイヤモンド・パール』の BGM
          をゲームプレイ中のようにループして再生できます。 作業 BGM 等にお役立てください。
        </Text>
        <Box my="8">
          <SoundList />
        </Box>
      </Container>
      <Box position="sticky" bottom={0}>
        <AudioController />
      </Box>
    </Grid>
  );
};

export default Home;

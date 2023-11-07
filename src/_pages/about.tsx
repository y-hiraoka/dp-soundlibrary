import {
  Box,
  Container,
  Heading,
  Icon,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { MdOpenInNew } from "react-icons/md";
import { Header } from "../components/Header";

const About: NextPage = () => {
  return (
    <Box color="white">
      <Header />
      <Container as="main" maxW="container.sm" mt="4">
        <Heading as="h1">このサイトについて</Heading>
        <Box mt="10">
          <Heading fontSize="xl">宣言</Heading>
          <Text mt="2">
            ©2006 Pokémon. ©1995-2006 Nintendo/Creatures Inc./GAME FREAK inc.
            <br />
            これは「
            <Link isExternal href="https://soundlibrary.pokemon.co.jp/">
              Pokémon DP Sound Library
            </Link>
            」の利用規約に同意し作成されたコンテンツです。
          </Text>
        </Box>
        <Box mt="10">
          <Heading fontSize="xl">Google Analytics</Heading>
          <Text mt="2">
            このサイトは{" "}
            <Link
              isExternal
              href="https://policies.google.com/technologies/partner-sites?hl=ja"
            >
              Google Analytics
            </Link>{" "}
            を使用しています。
          </Text>
        </Box>
        <Box mt="10">
          <Heading fontSize="xl">お問い合わせ</Heading>
          <Text mt="2">
            このサイトについてのお問い合わせは下記の方法にてお願いします。
          </Text>
          <UnorderedList paddingLeft="4">
            <ListItem>制作者 Twitter アカウント にリプライか DM を送る</ListItem>
            <ListItem>GitHub リポジトリに issue を作成する</ListItem>
          </UnorderedList>
        </Box>
        <Box mt="10">
          <Heading fontSize="xl">各種リンク</Heading>
          <UnorderedList mt="2" paddingLeft="2">
            <ListItem>
              <Link isExternal href="https://twitter.com/stin_factory">
                サイト制作者 Twitter
                <Icon as={MdOpenInNew} fontSize="sm" marginLeft="1" />
              </Link>
            </ListItem>
            <ListItem>
              <Link isExternal href="https://github.com/y-hiraoka/dp-soundlibrary">
                GitHub リポジトリ
                <Icon as={MdOpenInNew} fontSize="sm" marginLeft="1" />
              </Link>
            </ListItem>
            <ListItem>
              <Link isExternal href="https://soundlibrary.pokemon.co.jp/">
                Pokémon DP Sound Library
                <Icon as={MdOpenInNew} fontSize="sm" marginLeft="1" />
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Container>
    </Box>
  );
};

export default About;

import { Box, Container, Flex, Image, Link, Text } from "@chakra-ui/react";
import { VFC } from "react";
import NextLink from "next/link";
import { useFilteredSoundsCount, useSoundsAreFiltered } from "../state/filteringState";

export const Header: VFC = () => {
  const soundsAreFiltered = useSoundsAreFiltered();
  const filteredSoundsCount = useFilteredSoundsCount();

  return (
    <Box bgColor="whiteAlpha.300" backdropFilter="blur(2px)">
      <Container maxW="container.sm">
        <Flex as="header" py="2" justifyContent="space-between" alignItems="center">
          <NextLink href="/" passHref>
            <Box as="a" boxSize="14">
              <Image src="/pokeball.png" alt="logo" />
            </Box>
          </NextLink>
          {soundsAreFiltered && (
            <Text color="white" fontWeight="bold">
              絞り込み: {filteredSoundsCount} 件
            </Text>
          )}
          <NextLink href="/about" passHref>
            <Link color="white">About</Link>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
};

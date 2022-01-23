import { Box, Container, Flex, Image, Link } from "@chakra-ui/react";
import { VFC } from "react";
import NextLink from "next/link";

export const Header: VFC = () => {
  return (
    <Box bgColor="whiteAlpha.300" backdropFilter="blur(4px)">
      <Container maxW="container.sm">
        <Flex as="header" py="2" justifyContent="space-between" alignItems="center">
          <NextLink href="/" passHref>
            <Box as="a" boxSize="14">
              <Image src="/pokeball.png" alt="logo" />
            </Box>
          </NextLink>
          <NextLink href="/about" passHref>
            <Link color="white">About</Link>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
};

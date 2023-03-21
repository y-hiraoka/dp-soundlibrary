import { Box, Container, Flex, Link } from "@chakra-ui/react";
import { FC } from "react";
import NextLink from "next/link";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <Box bgColor="whiteAlpha.300" backdropFilter="blur(4px)">
      <Container maxW="container.sm">
        <Flex
          as="header"
          py="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <NextLink href="/">
            <Image
              src="/pokeball.png"
              alt="pokeball"
              width={14 * 4}
              height={14 * 4}
            />
          </NextLink>
          <Link as={NextLink} href="/about" color="white">
            About
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

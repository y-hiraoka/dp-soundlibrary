import { Box, Container, HStack, Link } from "@chakra-ui/react";
import { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const Navigation: FC = () => {
  return (
    <Box bgColor="whiteAlpha.300" backdropFilter="blur(4px)">
      <Container maxW="container.sm">
        <HStack as="nav" spacing="4">
          <NavigationLink href="/">BGM</NavigationLink>
          <NavigationLink href="/favorites">お気に入り</NavigationLink>
        </HStack>
      </Container>
    </Box>
  );
};

const NavigationLink: FC<{ href: string; children: string }> = ({ href, children }) => {
  const { pathname } = useRouter();
  const isActive = href === pathname;

  return (
    <NextLink href={href} passHref>
      <Link
        color={isActive ? "yellow.300" : "white"}
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="12"
        px="4"
        borderBottomWidth="2px"
        borderBottomColor={isActive ? "yellow" : "transparent"}
        _hover={{ color: isActive ? undefined : "yellow.200" }}
      >
        {children}
      </Link>
    </NextLink>
  );
};

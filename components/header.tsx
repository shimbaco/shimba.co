import { Box, Center, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

type HeaderLinkProps = {
  href: string;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <Link fontWeight="bold" textTransform="uppercase">
        {children}
      </Link>
    </NextLink>
  );
};

export const Header: React.FC = () => {
  return (
    <Box as="header" mt="6">
      <Center>
        <NextLink href="/">
          <Link
            color="blue.900"
            fontSize="8xl"
            fontWeight="bold"
            lineHeight="1"
          >
            shimba.co
          </Link>
        </NextLink>
      </Center>

      <HStack justify="center" mt="4" spacing="6">
        <Box>
          <HeaderLink href="/">Home</HeaderLink>
        </Box>

        <Box>
          <HeaderLink href="/projects">Projects</HeaderLink>
        </Box>
      </HStack>
    </Box>
  );
};

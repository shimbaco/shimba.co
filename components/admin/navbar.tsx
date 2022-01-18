import { UserProfile } from '@auth0/nextjs-auth0';
import { Box, HStack, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  user: UserProfile | undefined;
};

type NavbarLinkProps = {
  href: string;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <Link>{children}</Link>
    </NextLink>
  );
};

export const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <HStack bg="gray.800" color="white" px="4" py="2" spacing="6">
      <HStack spacing={4}>
        <NavbarLink href="/admin">Admin</NavbarLink>
        <NavbarLink href="/admin/posts/new">New Post</NavbarLink>
      </HStack>

      <Spacer />

      <Box>
        {user ? (
          <NavbarLink href="/api/auth/logout">Logout</NavbarLink>
        ) : (
          <NavbarLink href="/api/auth/login">Login</NavbarLink>
        )}
      </Box>
    </HStack>
  );
};

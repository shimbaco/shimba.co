import { UserProfile } from '@auth0/nextjs-auth0';
import { Center, Container, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import { isShimbaco } from '~lib/auth';

type Props = {
  children: ReactElement;
  user: UserProfile | undefined;
};

export const Content: React.FC<Props> = ({ children, user }) => {
  if (user && isShimbaco(user)) {
    return React.cloneElement(children, { user });
  }

  if (user && !isShimbaco(user)) {
    return (
      <Center as="main">
        <Container maxW="container.md" py="4">
          <Text>You are not shimbaco.</Text>
        </Container>
      </Center>
    );
  }

  return (
    <Center as="main">
      <Container maxW="container.md" py="4">
        <Text>Please login.</Text>
      </Container>
    </Center>
  );
};

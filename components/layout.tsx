import { Spacer, Stack } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

import { Footer } from '~components/footer';
import { Header } from '~components/header';

type Props = {
  title: string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="follow, index" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <Stack minH="100vh">
        <Stack spacing="6">
          <Header />
          {children}
        </Stack>
        <Spacer />
        <Footer />
      </Stack>
    </>
  );
};

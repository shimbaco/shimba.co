import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

import '~styles/globals.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // @ts-ignore
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  const getLayout =
    Component.getLayout || ((page: ReactElement, _props: AppProps) => page);

  return (
    <UserProvider>
      <ChakraProvider>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;

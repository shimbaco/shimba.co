import { UserProvider } from '@auth0/nextjs-auth0';
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
  const getLayout =
    Component.getLayout || ((page: ReactElement, _props: AppProps) => page);

  return (
    <UserProvider>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </UserProvider>
  );
}

export default MyApp;

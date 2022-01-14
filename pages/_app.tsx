import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';

import '~styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

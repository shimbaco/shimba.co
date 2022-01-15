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

      <div className="flex flex-col min-h-screen pt-8 space-y-4">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

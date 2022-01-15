import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
};

export const Admin: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="nofollow, noindex" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      {children}
    </>
  );
};

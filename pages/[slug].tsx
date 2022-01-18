import { Box, Center, Container } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { ReactElement } from 'react';

import { Layout } from '~components/layout';
import markdownToHtml from '~lib/markdownToHtml';
import prisma, { Post } from '~lib/prisma';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  post: Post;
};

function SlugPage({ post }: Props) {
  const router = useRouter();
  const slug = router.query.slug || [];

  return (
    <Center as="main">
      <Container maxW="container.md">
        <Box>slug: {slug}</Box>
        <Box dangerouslySetInnerHTML={{ __html: post.body ?? '' }}></Box>
      </Container>
    </Center>
  );
}

SlugPage.getLayout = (page: ReactElement, { post }: Props) => {
  return <Layout title={`${post.title} | shimba.co`}>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<Props, IParams> = async ({
  params,
}) => {
  const post = await prisma.post.findFirst({
    where: {
      slug: params!.slug,
      publishedAt: { not: null },
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  const body = await markdownToHtml(post.body ?? '');

  return {
    props: {
      post: {
        ...post,
        body,
      },
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
  });

  return {
    paths: (posts ?? []).map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default SlugPage;

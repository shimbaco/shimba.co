import { Box, Center, Container, Link, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import React, { ReactElement } from 'react';

import { Layout } from '~components/layout';
import prisma, { Post } from '~lib/prisma';

type Props = {
  posts: Post[];
};

function HomePage({ posts }: Props) {
  return (
    <Center as="main">
      <Container maxW="container.md">
        <Stack spacing="4">
          {posts.map((post: Post) => (
            <Box key={post.slug}>
              <Box>
                <Text color="gray.700" fontSize="sm">
                  {dayjs(post.publishedAt).format('MMMM D, YYYY')}
                </Text>
              </Box>

              <Box>
                <NextLink href={`/${post.slug}`}>
                  <Link fontWeight="semibold">{post.title}</Link>
                </NextLink>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Center>
  );
}

HomePage.getLayout = (page: ReactElement, _props: Props) => {
  return <Layout title="shimba.co">{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
  });

  return {
    props: {
      posts: posts ?? [],
    },
    revalidate: 60,
  };
};

export default HomePage;

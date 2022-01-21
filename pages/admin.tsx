import {
  Box,
  Center,
  Container,
  HStack,
  Link,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React, { ReactElement } from 'react';
import useSWR from 'swr';

import { Layout } from '~components/admin/layout';
import fetcher from '~lib/fetcher';
import { Post } from '~lib/prisma';

function AdminPage() {
  const { data: posts, error } = useSWR<Post[]>('/api/posts', fetcher);

  if (error) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Center as="main">
      <Container maxW="container.md" py="4">
        <Stack spacing="4">
          {posts &&
            posts.map((post) => (
              <Box key={post.id.toString()}>
                <Box>
                  {post.publishedAt ? (
                    <Text color="gray.700" fontSize="sm">
                      {dayjs(post.publishedAt).format('MMMM D, YYYY')}
                    </Text>
                  ) : (
                    <Tag fontWeight="bold" size="sm">
                      Draft
                    </Tag>
                  )}
                </Box>

                <Link href={`/${post.slug}`} fontWeight="bold" target="_blank">
                  {post.title}
                </Link>

                <HStack>
                  <NextLink href={`/admin/posts/${post.id}/edit`}>
                    <Link fontSize="sm">Edit</Link>
                  </NextLink>
                </HStack>
              </Box>
            ))}
        </Stack>
      </Container>
    </Center>
  );
}

AdminPage.getLayout = (page: ReactElement) => {
  return <Layout title="Admin | shimba.co">{page}</Layout>;
};

export default AdminPage;

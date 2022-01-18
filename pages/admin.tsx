import { Box, Center, Container } from '@chakra-ui/react';
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
      <Container maxW="container.md">
        {posts &&
          posts.map((post) => <div key={post.id.toString()}>{post.title}</div>)}
      </Container>
    </Center>
  );
}

AdminPage.getLayout = (page: ReactElement) => {
  return <Layout title="Admin | shimba.co">{page}</Layout>;
};

export default AdminPage;

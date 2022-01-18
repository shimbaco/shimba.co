import { Center, Container } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import { Layout } from '~components/admin/layout';
import { PostForm } from '~components/admin/post-form';

function AdminPostsNewPage() {
  return (
    <Center as="main">
      <Container maxW="container.md">
        <PostForm />
      </Container>
    </Center>
  );
}

AdminPostsNewPage.getLayout = (page: ReactElement) => {
  return <Layout title="New Post | Admin | shimba.co">{page}</Layout>;
};

export default AdminPostsNewPage;

import { Center, Container } from '@chakra-ui/react';
import Router from 'next/router';
import React, { ReactElement } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Layout } from '~components/admin/layout';
import { PostForm } from '~components/admin/post-form';
import { PostInputs } from '~lib/types';

function AdminPostsNewPage() {
  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Post was not saved. Message: ', data.message);
      return;
    }

    await Router.push('/admin');
  };

  return (
    <Center as="main">
      <Container maxW="container.md" py="4">
        <PostForm onSubmit={onSubmit} />
      </Container>
    </Center>
  );
}

AdminPostsNewPage.getLayout = (page: ReactElement) => {
  return <Layout title="New Post | Admin | shimba.co">{page}</Layout>;
};

export default AdminPostsNewPage;

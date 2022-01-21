import { Box, Center, Container } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { SubmitHandler } from 'react-hook-form';
import useSWR from 'swr';

import { Layout } from '~components/admin/layout';
import { PostForm } from '~components/admin/post-form';
import fetcher from '~lib/fetcher';
import { Post } from '~lib/prisma';
import { PostInputs } from '~lib/types';

function AdminEditPostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Post was not updated. Message: ', data.message);
      return;
    }

    await Router.push('/admin');
  };

  const { data: post, error } = useSWR<Post>(`/api/posts/${postId}`, fetcher);

  if (error) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Center as="main">
      <Container maxW="container.md" py="4">
        <PostForm onSubmit={onSubmit} post={post} />
      </Container>
    </Center>
  );
}

AdminEditPostPage.getLayout = (page: ReactElement) => {
  return <Layout title="Edit Post | Admin | shimba.co">{page}</Layout>;
};

export default AdminEditPostPage;

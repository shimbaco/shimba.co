import React, { ReactElement } from 'react';
import useSWR from 'swr';

import { Layout } from '~components/admin/layout';
import fetcher from '~lib/fetcher';
import { Post } from '~lib/prisma';

function AdminPage() {
  const { data: posts, error } = useSWR<Post[]>('/api/posts', fetcher);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto py-4">
      {posts &&
        posts.map((post) => <div key={post.id.toString()}>{post.title}</div>)}
    </div>
  );
}

AdminPage.getLayout = (page: ReactElement) => {
  return <Layout title="Admin | shimba.co">{page}</Layout>;
};

export default AdminPage;

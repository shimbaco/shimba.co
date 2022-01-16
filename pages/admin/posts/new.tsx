import React, { ReactElement } from 'react';

import { Layout } from '~components/admin/layout';
import { PostForm } from '~components/admin/post-form';

function AdminPostsNewPage() {
  return (
    <div className="container mx-auto py-4">
      <PostForm />
    </div>
  );
}

AdminPostsNewPage.getLayout = (page: ReactElement) => {
  return <Layout title="New Post | Admin | shimba.co">{page}</Layout>;
};

export default AdminPostsNewPage;

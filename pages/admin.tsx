import { UserProfile } from '@auth0/nextjs-auth0';
import React, { ReactElement } from 'react';

import { Layout } from '~components/admin/layout';
import { Navbar } from '~components/admin/navbar';

type Props = {
  user: UserProfile;
};

function AdminPage({ user }: Props) {
  return (
    <>
      <Navbar user={user} />
    </>
  );
}

AdminPage.getLayout = (page: ReactElement) => {
  return <Layout title="Layout | shimba.co">{page}</Layout>;
};

export default AdminPage;

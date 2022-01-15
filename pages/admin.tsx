import { UserProfile } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React, { ReactElement } from 'react';

import { Admin as AdminLayout } from '~components/layouts/admin';

type Props = {
  user: UserProfile;
};

function AdminPage({ user }: Props) {
  return (
    <>
      {user ? (
        <Link href="/api/auth/logout">
          <a>Logout</a>
        </Link>
      ) : (
        <Link href="/api/auth/login">
          <a>Login</a>
        </Link>
      )}
    </>
  );
}

AdminPage.getLayout = (page: ReactElement) => {
  return <AdminLayout title="Admin | shimba.co">{page}</AdminLayout>;
};

export default AdminPage;

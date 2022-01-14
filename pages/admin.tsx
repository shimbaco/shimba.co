import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

import { Layout } from '~components/layout';

function AdminPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Layout title="Admin">
      {user ? (
        <Link href="/api/auth/logout">
          <a>Logout</a>
        </Link>
      ) : (
        <Link href="/api/auth/login">
          <a>Login</a>
        </Link>
      )}
    </Layout>
  );
}

export default AdminPage;

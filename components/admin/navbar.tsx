import { UserProfile } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';

type Props = {
  user: UserProfile | undefined;
};

type NavbarLinkProps = {
  href: string;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href}>
      <a className="hover:text-slate-200 hover:underline text-slate-100">
        {children}
      </a>
    </Link>
  );
};

export const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <div className="bg-slate-900 flex h-[60px] items-center justify-between px-4">
      <div>
        <NavbarLink href="/admin">Admin</NavbarLink>
      </div>

      <div>
        {user ? (
          <NavbarLink href="/api/auth/logout">Logout</NavbarLink>
        ) : (
          <NavbarLink href="/api/auth/login">Login</NavbarLink>
        )}
      </div>
    </div>
  );
};

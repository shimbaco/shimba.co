import Link from 'next/link';
import React from 'react';

type NavHeaderLinkProps = {
  href: string;
};

const NavHeaderLink: React.FC<NavHeaderLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href}>
      <a className="hover:text-slate-800 hover:underline text-slate-600">
        {children}
      </a>
    </Link>
  );
};

export default function NavHeader() {
  return (
    <>
      <div className="text-8xl text-center">
        <Link href="/">
          <a>shimba.co</a>
        </Link>
      </div>

      <div className="flex justify-center space-x-6">
        <div>
          <NavHeaderLink href="/">Home</NavHeaderLink>
        </div>

        <div>
          <NavHeaderLink href="/projects">Projects</NavHeaderLink>
        </div>
      </div>
    </>
  );
}

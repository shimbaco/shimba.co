import Link from 'next/link';
import React from 'react';

type HeaderLinkProps = {
  href: string;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({
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

export const Header: React.FC = () => {
  return (
    <>
      <div className="text-8xl text-center">
        <Link href="/">
          <a>shimba.co</a>
        </Link>
      </div>

      <div className="flex justify-center space-x-6">
        <div>
          <HeaderLink href="/">Home</HeaderLink>
        </div>

        <div>
          <HeaderLink href="/projects">Projects</HeaderLink>
        </div>
      </div>
    </>
  );
};

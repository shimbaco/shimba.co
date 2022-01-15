import { UserProfile } from '@auth0/nextjs-auth0';
import React, { ReactElement } from 'react';

import { isShimbaco } from '~lib/auth';

type Props = {
  children: ReactElement;
  user: UserProfile | undefined;
};

export const Content: React.FC<Props> = ({ children, user }) => {
  if (user && isShimbaco(user)) {
    return React.cloneElement(children, { user });
  }

  if (user && !isShimbaco(user)) {
    return <div className="container mx-auto py-4">You are not shimbaco.</div>;
  }

  return <div className="container mx-auto py-4">Please login.</div>;
};

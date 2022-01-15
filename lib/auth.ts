import { UserProfile } from '@auth0/nextjs-auth0';

export const isShimbaco = (user: UserProfile) => {
  return user.email === 'me@shimba.co';
};

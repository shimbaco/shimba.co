import { Post } from '~lib/prisma';

export type PostInputs = Pick<Post, 'title' | 'body' | 'slug' | 'publishedAt'>;

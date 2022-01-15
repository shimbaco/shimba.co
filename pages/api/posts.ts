import { NextApiRequest, NextApiResponse } from 'next';

import prisma, { Post } from '~lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
  });

  res.json(posts);
}

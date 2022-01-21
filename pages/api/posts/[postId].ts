import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';

import { isShimbaco } from '~lib/auth';
import prisma from '~lib/prisma';
import { postInputsSchema } from '~lib/schemas';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await handleGet(req, res);
  } else if (req.method === 'PATCH') {
    await handlePatch(req, res);
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });

  res.json(post);
}

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;
  const session = getSession(req, res);

  if (!session || !isShimbaco(session.user)) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { title, body, slug, publishedAt } = req.body;

  try {
    const post = await postInputsSchema.validate({
      title,
      body,
      slug,
      publishedAt,
    });

    const result = await prisma.post.update({
      where: { id: Number(postId) },
      data: post,
    });

    res.status(204).json({});
  } catch (error) {
    console.error(error);

    let message = 'Error';
    if (error instanceof ValidationError) {
      message = error.message;
    }

    res.status(400).json({ message });
  }
}

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { ReactElement } from 'react';

import { Application as ApplicationLayout } from '~components/layouts/application';
import markdownToHtml from '~lib/markdownToHtml';
import prisma, { Post } from '~lib/prisma';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  post: Post;
};

function SlugPage({ post }: Props) {
  const router = useRouter();
  const slug = router.query.slug || [];

  return (
    <>
      <div>slug: {slug}</div>
      <main dangerouslySetInnerHTML={{ __html: post.body ?? '' }}></main>
    </>
  );
}

SlugPage.getLayout = (page: ReactElement, { post }: Props) => {
  return (
    <ApplicationLayout title={`${post.title} | shimba.co`}>
      {page}
    </ApplicationLayout>
  );
};

export const getStaticProps: GetStaticProps<Props, IParams> = async ({
  params,
}) => {
  const post = await prisma.post.findFirst({
    where: {
      slug: params!.slug,
      publishedAt: { not: null },
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  const body = await markdownToHtml(post.body ?? '');

  return {
    props: {
      post: {
        ...post,
        body,
      },
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
  });

  return {
    paths: (posts ?? []).map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default SlugPage;

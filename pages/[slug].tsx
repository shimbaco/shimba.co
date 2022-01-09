import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { Layout } from '~components/layout';
import { Post } from '~lib/constants';
import markdownToHtml from '~lib/markdownToHtml';
import { supabase } from '~lib/supabase';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  post: Post;
};

export default function SlugPage({ post }: Props) {
  const router = useRouter();
  const slug = router.query.slug || [];

  return (
    <Layout title={post.title}>
      <div>slug: {slug}</div>
      <main dangerouslySetInnerHTML={{ __html: post.body }}></main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props, IParams> = async ({
  params,
}) => {
  const { data: post, error } = await supabase
    .from<Post>('posts')
    .select('slug, title, body, published_at')
    .not('published_at', 'is', null)
    .eq('slug', params!.slug)
    .single();

  if (error) {
    console.error(error);
  }

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
  const { data: posts, error } = await supabase
    .from<Post>('posts')
    .select('slug, title')
    .not('published_at', 'is', null);

  if (error) {
    console.error(error);
  }

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

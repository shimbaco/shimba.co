import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Layout } from '~components/layout';
import Profile from '~components/profile';
import { Post } from '~lib/constants';
import { supabase } from '~lib/supabase';

type Props = {
  posts: Post[];
};

function HomePage({ posts }: Props) {
  return (
    <Layout title="shimba.co">
      <div className="max-w-3xl mx-auto space-y-3">
        {posts.map((post: Post) => {
          return (
            <div key={post.slug}>
              <div>
                <span>{dayjs(post.published_at).format('MMMM D, YYYY')}</span>
              </div>

              <div>
                <Link href={`/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <Profile />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: posts, error } = await supabase
    .from<Post>('posts')
    .select('slug, title, published_at')
    .not('published_at', 'is', null);

  if (error) {
    console.error(error);
  }

  return {
    props: {
      posts: posts ?? [],
    },
    revalidate: 60,
  };
};

export default HomePage;

import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Layout } from '~components/layout';
import NavHeader from '~components/nav-header';
import Profile from '~components/profile';
import prisma, { Post } from '~lib/prisma';

type Props = {
  posts: Post[];
};

function HomePage({ posts }: Props) {
  return (
    <Layout title="shimba.co">
      <div className="flex flex-col min-h-screen space-y-3">
        <NavHeader />

        <div className="grow lg:w-6/12 mx-auto px-3 w-full">
          {posts.map((post: Post) => (
            <div key={post.slug}>
              <div>
                <span className="text-gray-400">
                  {dayjs(post.publishedAt).format('MMMM D, YYYY')}
                </span>
              </div>

              <div>
                <Link href={`/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Profile />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
  });

  return {
    props: {
      posts: posts ?? [],
    },
    revalidate: 60,
  };
};

export default HomePage;

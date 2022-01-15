import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import Header from '~components/header';
import { Layout } from '~components/layout';
import Footer from '~components/footer';
import prisma, { Post } from '~lib/prisma';

type Props = {
  posts: Post[];
};

function HomePage({ posts }: Props) {
  return (
    <Layout title="shimba.co">
      <div className="flex flex-col min-h-screen pt-8 space-y-4">
        <Header />

        <div className="grow lg:w-6/12 mx-auto prose px-3 space-y-4 w-full">
          {posts.map((post: Post) => (
            <div key={post.slug}>
              <div>
                <span className="text-gray-500">
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

        <Footer />
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

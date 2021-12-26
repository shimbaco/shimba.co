import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Layout } from '~components/layout';
import Profile from '~components/profile';
import prisma, { Post } from '~lib/prisma';

type Props = {
  notes: Post[];
};

function HomePage({ notes }: Props) {
  return (
    <Layout title="shimba.co">
      <div className="max-w-3xl mx-auto space-y-3">
        {notes.map((note: Post) => {
          return (
            <div key={note.slug}>
              <div>
                <span>{dayjs(note.publishedAt).format('MMMM D, YYYY')}</span>
              </div>

              <div>
                <Link href={`/${note.slug}`}>
                  <a>{note.title}</a>
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
  const notes = await prisma.post.findMany({
    where: {
      publishedAt: { not: null },
    },
  });

  return {
    props: {
      notes,
    },
  };
};

export default HomePage;

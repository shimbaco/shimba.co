import dayjs from 'dayjs'
import Link from 'next/link'

import { Layout } from '~components/layout'
import Profile from '~components/profile'

import { getAllNotes } from '~lib/note'

function HomePage({ notes }: any) {
  return (
    <Layout title="shimba.co">
      <div className="max-w-3xl mx-auto space-y-3">
        {notes.map((note: any) => {
          return (
            <div key={note.slug}>
              <div>
                <span>
                  {dayjs(note.publishedAt).format('MMMM D, YYYY')}
                </span>
              </div>

              <div>
                <Link href={`/${note.slug}`}>
                  <a>{note.title}</a>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <Profile />
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const notes = getAllNotes(['slug', 'publishedAt', 'title'])

  return {
    props: {
      notes,
    },
  }
}

export default HomePage

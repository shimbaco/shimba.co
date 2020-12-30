import dayjs from 'dayjs'
import Link from 'next/link'

import Layout from '~components/layout'
import Profile from '~components/profile'

import { getAllNotes } from '~lib/note'

function HomePage({ notes }: any) {
  return (
    <Layout>
      <article className="container mb-7">
        <div className="justify-content-center row">
          {
            notes.map((note: any) => {
              return (
                <>
                  <div className="col-6 text-right">
                    {dayjs(note.publishedAt).format('YYYY-MM-DD')}
                  </div>
                  <div className="col-6">
                    <Link href={`/${note.slug}`}>
                      <a>{note.title}</a>
                    </Link>
                  </div>
                </>
              )
            })
          }
        </div>
      </article>
      <Profile />
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const notes = getAllNotes(['slug', 'publishedAt', 'title'])

  return {
    props: {
      notes
    }
  }
}


export default HomePage

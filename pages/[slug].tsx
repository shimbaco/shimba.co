import { useRouter } from 'next/router'

import { Layout } from '~components/layout'
import markdownToHtml from '~lib/markdownToHtml'
import { getNoteBySlug, getAllNotes } from '~lib/note'

export default function SlugPage({ note }: any): any {
  const router = useRouter()
  const slug = router.query.slug || []

  return (
    <Layout title={note.title}>
      <div>slug: {slug}</div>
      <p>{note.content}</p>
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const note = getNoteBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(note.content || '')

  return {
    props: {
      note: {
        ...note,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const notes = getAllNotes(['slug'])

  return {
    paths: notes.map((note) => {
      return {
        params: {
          slug: note.slug,
        },
      }
    }),
    fallback: false,
  }
}

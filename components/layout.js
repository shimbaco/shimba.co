import Link from 'next/link'
import Head from 'next/head'

export default function Layout({
  children,
  title = 'shimbaco',
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>shimbaco</a>
          </Link>{' '}
          |
          <Link href="/notes">
            <a>Notes</a>
          </Link>
        </nav>
      </header>

      {children}
    </div>
  )
}

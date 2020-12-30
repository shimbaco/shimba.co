import Head from 'next/head'

import HeaderNavLink from '~components/ui/Link'

export default function Layout({
  children,
  title = 'shimba.co',
}: any) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <div className="container py-5">
        <header className="text-center">
          <h1 className="display-1 mb-5">
            <a className="text-body" href="/">shimba.co</a>
          </h1>
          <nav className="d-flex justify-content-center">
            <HeaderNavLink href="/">
              Home
            </HeaderNavLink>

            <HeaderNavLink href="/notes">
              Notes
            </HeaderNavLink>

            <HeaderNavLink href="/projects">
              Projects
            </HeaderNavLink>
          </nav>
        </header>

        <hr className="my-7" />

        {children}
      </div>
    </>
  )
}

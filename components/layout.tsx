import Head from 'next/head'

import HeaderNavLink from '~components/ui/Link'

export default function Layout({
  children,
  title = 'shimbaco',
}: any) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <div className="container max-w-screen-md mx-auto py-10">
        <header className="text-center">
          <h1 className="font-black mb-5 opacity-90 text-5xl text-white">
            <a href="/">shimbaco</a>
          </h1>
          <nav className="flex justify-center">
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

        <hr className="my-10 opacity-50" />

        {children}
      </div>
    </>
  )
}

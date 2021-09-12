import Head from 'next/head'
import Link from 'next/link'

type HeaderNavLinkProps = {
  href: string
}

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href}>
      <a>
        {children}
      </a>
    </Link>
  )
}

type Props = {
  title: string
}

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <div>
        <div>
          <div className="text-8xl text-center">
            <Link href="/">
              <a>shimba.co</a>
            </Link>
          </div>

          <div className="flex justify-center mt-3 space-x-6">
            <div>
              <HeaderNavLink href="/">Home</HeaderNavLink>
            </div>

            <div>
              <HeaderNavLink href="/projects">Projects</HeaderNavLink>
            </div>

            <div>
              <HeaderNavLink href="/notes">Notes</HeaderNavLink>
            </div>

            <div>
              <HeaderNavLink href="/about">About</HeaderNavLink>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  )
}

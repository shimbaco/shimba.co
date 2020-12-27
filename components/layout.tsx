import Link from 'next/link'

export default function Layout({
  children,
  title = 'shimbaco',
}: any) {
  return (
    <>
      <div className="container py-4" style={{ maxWidth: '720px' }}>
        <header>
          <nav className="justify-content-center nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Top</a>
              </Link>{' '}
            </li>

            <li className="nav-item">
              <Link href="/notes">
                <a className="nav-link">Notes</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/projects">
                <a className="nav-link">Projects</a>
              </Link>
            </li>
          </nav>
        </header>

        {children}
      </div>
    </>
  )
}

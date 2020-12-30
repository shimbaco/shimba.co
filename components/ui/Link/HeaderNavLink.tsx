import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const HeaderNavLink: React.FC<NextLinkProps> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a className="mx-4 text-uppercase" {...props}>{children}</a>
    </NextLink>
  )
}

export default HeaderNavLink

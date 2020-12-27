import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const HeaderNavLink: React.FC<NextLinkProps> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a className="hover:text-pink-200 opacity-90 px-4 rounded text-white uppercase" {...props}>{children}</a>
    </NextLink>
  )
}

export default HeaderNavLink

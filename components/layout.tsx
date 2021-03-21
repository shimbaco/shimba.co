import {
  Box,
  Container,
  Heading,
  HStack,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

type HeaderNavLinkProps = {
  href: string
} & ChakraLinkProps

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href}>
      <ChakraLink flexBasis="10%" {...props}>
        {children}
      </ChakraLink>
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

      <Container centerContent maxW="container.md" py={6}>
        <Box textAlign="center" w="100%">
          <Heading size="4xl">
            <Link href="/">
              <ChakraLink>shimba.co</ChakraLink>
            </Link>
          </Heading>

          <HStack justifyContent="center" mt={6} spacing={6}>
            <HeaderNavLink href="/">Home</HeaderNavLink>

            <HeaderNavLink href="/notes">Notes</HeaderNavLink>

            <HeaderNavLink href="/projects">Projects</HeaderNavLink>
          </HStack>
        </Box>

        {children}
      </Container>
    </>
  )
}

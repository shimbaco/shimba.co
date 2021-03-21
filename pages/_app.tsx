import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AppProps } from 'next/app'

import '~styles/globals.scss'

import colors from '~lib/colors'

const theme = extendTheme({
  colors,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

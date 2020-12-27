import { AppProps } from 'next/app'

import '../css/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

import React from 'react'
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body className="bg-black bg-opacity-80">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

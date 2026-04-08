import Script from 'next/script'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

import type { DocumentContext } from 'next/document'

const excludedLocales = ['uz', 'ru', 'en']
const MyDocument = ({ locale }: DocumentContext) => {
  return (
    <Html lang={locale}>
      <Head>
        <Script src="/assets/scripts/translation.js" strategy="beforeInteractive" />
        <Script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />

        <Script
          src="https://unpkg.com/react-scan/dist/auto.global.js"
          type="text/javascript"
          strategy="afterInteractive"
        />
      </Head>
      <body className={excludedLocales?.includes(locale || '') ? 'notranslate' : 'translate'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    })

  const initialProps = await Document.getInitialProps(ctx)
  const style = extractStyle(cache, true)
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  }
}

export default MyDocument

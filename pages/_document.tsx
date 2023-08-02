/* eslint-disable react/jsx-props-no-spreading */
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// Boilerplate copied from https://github.com/vercel/next.js/blob/canary/examples/with-styled-components-babel/pages/_document.tsx
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head key="Document">
          {/* proxima-novo font */}
          <link
            rel="stylesheet"
            href="https://use.typekit.net/iwq0uru.css"
            key="typekit"
          />
        </Head>
        <body key="body">
          <Main />
          <NextScript />
          <section id="modalHolder" />
        </body>
      </Html>
    );
  }
}

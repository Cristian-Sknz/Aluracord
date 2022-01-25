import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import GoogleFont from '@components/models/GoogleFont';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='pt-br'>
        <Head>
          <meta
            name='description'
            content='Projeto Imersão Alura por Cristian-SknZ'
          />
          <meta name='theme-color' content='#FFFFFF' />

          <link rel='icon' href='/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />
          <GoogleFont
            font={[
              { name: 'Roboto', weights: [300, 400, 500, 700] },
              { name: 'Poppins', weights: [300, 400, 500, 700] },
            ]}
          />
          <link
            href='/favicon-16x16.png'
            rel='icon'
            type='image/png'
            sizes='16x16'
          />
          <link
            href='/favicon-32x32.png'
            rel='icon'
            type='image/png'
            sizes='32x32'
          />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

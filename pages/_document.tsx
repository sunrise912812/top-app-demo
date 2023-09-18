import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() : JSX.Element {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

//Document.getInitialProps = async (ctx : DocumentContext) : Promise<DocumentInitialProps> => {
//  const initialProps = await Document.getInitialProps(ctx);
//  return { ...initialProps };
//}; - На официальном сайте рекомендуют это не использовать, т.к устарело.

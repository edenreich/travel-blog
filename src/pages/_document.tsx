import { Html, Head, Main, NextScript } from 'next/document';
import Footer from '@/components/Footer';

function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" href="/img/pencil.png"></link>
        <meta charSet="utf-8" />
        <meta name="author" content="Eden Reich" />
        <meta name="keywords" content="Eden,Eden Reich,Europe travels,Asia travels,Photography,DJI,Drone Photography" />
        <meta name="description" content="This is a blog about my travels around the world." />
        <meta property="og:site_name" content="Eden Reich" />
        <meta property="og:image" content="/img/profile_600.png" />
        <meta property="og:description" content="This is a blog about my travels around the world." />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}

export default MyDocument;

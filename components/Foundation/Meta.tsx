import Head from 'next/head';
import { home } from 'globalConstants';

const Meta = (): JSX.Element => (
  <Head key="Meta">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
      key="viewport"
    />
    <meta charSet="utf-8" key="charSet" />
    {/* Favicon Setup */}
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png?v=2"
      key="apple-touch-icon"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png?v=2"
      key="icon32"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png?v=2"
      key="icon16"
    />
    <link rel="manifest" href="/site.webmanifest?v=2" key="manifest" />
    <link
      rel="mask-icon"
      href="/safari-pinned-tab.svg?v=2"
      color="#0066cc"
      key="mask-icon"
    />
    <meta property="og:icon" content={`${home}/logo.png`} key="ogIcon" />
    <link rel="shortcut icon" href={`${home}/favicon.ico?v=2`} key="shortcut" />
    <meta name="msapplication-TileColor" content="#030303" key="msTile" />
    <meta name="theme-color" content="#0066cc" key="themeColor" />

    {/* og data */}
    <title key="title">Gahdzai - Keep an eye out</title>
    <meta property="og:type" content="website" key="ogType" />
    <meta property="og:site_name" content="Gahdzai" key="ogName" />
    <meta
      property="og:description"
      content="Keep an eye out"
      key="ogDescription"
    />
  </Head>
);

export default Meta;

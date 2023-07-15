/* eslint-disable react/jsx-props-no-spreading */
import Layout from "@/components/Foundation/Layout";
import Meta from "@/components/Foundation/Meta";
import Providers from "@/components/Foundation/Providers/Providers";
import type { AppProps } from "next/app";

import "public/nprogress.css";

// eslint-disable-next-line react/function-component-definition
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Providers pageProps={pageProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}

export default MyApp;

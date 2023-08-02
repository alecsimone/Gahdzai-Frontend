import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import GlobalStyle from '@/styles/globalStyle';
import { useApollo } from '@/utils/apollo/apolloHandlers';
// import theme from "@/styles/theme";
// import { ThemeProvider } from "styled-components";

interface ProvidersProps {
  children: ReactNode;
  pageProps: any;
}

const Providers = ({ children, pageProps }: ProvidersProps): JSX.Element => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      {children}
    </ApolloProvider>
  );
};

export default Providers;

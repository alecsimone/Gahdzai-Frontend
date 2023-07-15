import GlobalStyle from "@/styles/globalStyle";
import { useApollo } from "@/utils/apollo/apolloHandlers";
import { ApolloProvider } from "@apollo/client";
// import theme from "@/styles/theme";
import { ReactNode } from "react";
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

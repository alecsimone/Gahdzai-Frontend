import GlobalStyle from "@/styles/globalStyle";
import theme from "@/styles/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface ProvidersProps {
  children: ReactNode;
  pageProps: any;
}

const Providers = ({ children, pageProps }: ProvidersProps): JSX.Element => {
  // const apolloClient = useApollo(pageProps);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Providers;

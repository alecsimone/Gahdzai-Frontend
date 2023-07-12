import React from "react";
import StyledComponentsRegistry from "@/components/Foundation/StyledComponentsRegistry/registry";
import GlobalStyle from "@/styles/globalStyle";
import Header from "@/components/Foundation/Header/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
    <head />
    <body>
      <StyledComponentsRegistry>
        <GlobalStyle />
        <Header />
        {children}
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;

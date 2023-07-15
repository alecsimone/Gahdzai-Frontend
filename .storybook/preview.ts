import type { Preview } from "@storybook/react";

import { MockedProvider } from "@apollo/client/testing";
import { RouterContext } from "next/dist/shared/lib/router-context";
import GlobalStyles from "../styles/globalStyle";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import viewports from "./viewports";

/* TODO: update import for your custom theme configurations */
// import { lightTheme, darkTheme } from '../path/to/themes';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: viewports,
      defaultViewport: "mobile",
    },
    apolloClient: {
      MockedProvider,
    },
    nextRouter: {
      Provider: RouterContext.Provider,
    },
  },

  decorators: [
    // Adds global styles and theme switching support.
    withThemeFromJSXProvider({
      /* Uncomment for theme switching support */
      // themes: {
      //   light: lightTheme,
      //   dark: darkTheme,
      // }
      // defaultTheme: 'light',
      // Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
};

export default preview;

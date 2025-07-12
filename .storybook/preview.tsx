import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme, Theme } from "../src/styles/theme";
import { GlobalStyles } from "../src/styles/GlobalStyles";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#0a0a0a",
        },
        {
          name: "surface",
          value: "#1a1a1a",
        },
      ],
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", padding: "20px" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;

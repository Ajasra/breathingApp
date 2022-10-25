import { MantineProvider } from "@mantine/core";
import SEO from "@components/SEO/index.js";

import "@styles/globals.css";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <SEO title="Breathing" />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

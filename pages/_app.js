import { MantineProvider } from "@mantine/core";
import SEO from "@components/SEO/index.js";

import "@styles/globals.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@components/User/UserContext";

import '@tremor/react/dist/esm/tremor.css'

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
          primaryColor: "cyan",
        }}
      >
        <ToastContainer theme="dark" />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </MantineProvider>
    </>
  );
}

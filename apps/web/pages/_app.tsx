import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "ui/fonts/styles.css"; // for custom fonts not available on @fontsource

import { WebLayout } from "@/features/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <WebLayout>
        <Component {...pageProps} />
      </WebLayout>
    </ChakraProvider>
  );
};

export default App;

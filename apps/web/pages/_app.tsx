import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/poppins/400.css";
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

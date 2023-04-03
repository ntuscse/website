import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/poppins/400.css";
import { WebLayout } from "@/features/layout";
import { CartProvider } from "@/features/merch/context/cart";

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <WebLayout>
            <Component {...pageProps} />
          </WebLayout>
        </CartProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

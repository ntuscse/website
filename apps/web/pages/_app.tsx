import "../styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "ui/fonts/styles.css"; // for custom fonts not available on @fontsource

import { WebLayout } from "@/features/layout";
import { CartProvider } from "@/features/merch/context/cart";
import { CheckoutProvider } from "@/features/merch/context/checkout";
import { trpc } from "@/lib/trpc";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <CheckoutProvider>
            <WebLayout>
              <Component {...pageProps} />
            </WebLayout>
          </CheckoutProvider>
        </CartProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default trpc.withTRPC(App);

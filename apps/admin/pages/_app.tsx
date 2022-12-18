import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import { Layout } from "ui/components/admin";
import type { AppProps } from "next/app";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/poppins/400.css";
import { UserProvider } from "contexts/user.context";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</UserProvider>
	);
}

export default MyApp;

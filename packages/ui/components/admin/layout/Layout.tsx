import { Box } from "@chakra-ui/react";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<header>
				<title>Admin Panel</title>
				<link rel="icon" href="/"></link>
			</header>

			<main>
				<Box bg="blackAlpha.50" minHeight="100vh">
					{children}
				</Box>
			</main>
		</>
	);
};

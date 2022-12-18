import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "@/pages/index";

// example boilerplate test
describe("App", () => {
	it("renders the home", () => {
		render(
			<ChakraProvider>
				<Home />
			</ChakraProvider>
		);

		const submitButton = screen.queryByText("submit");
		expect(submitButton).toBeNull(); // it doesn't exist
	});
});

import { render} from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

export const renderComponent = (component: React.ReactNode) => {
    return render(
        <ChakraProvider>
            {component}
        </ChakraProvider>
    )
}
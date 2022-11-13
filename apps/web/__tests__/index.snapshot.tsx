import { render } from '@testing-library/react'
import { ChakraProvider } from "@chakra-ui/react";
import Home from '@/pages/index'

it('renders homepage unchanged', () => {
  const { container } = render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
  )
  expect(container).toMatchSnapshot()
})

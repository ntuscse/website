import { render, screen } from '@testing-library/react'
import { ChakraProvider } from "@chakra-ui/react";
import Home from '@/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(
        <ChakraProvider>
          <Home />
        </ChakraProvider>
    )

    const heading = screen.getByRole('heading', {
      name: 'WELCOME TO SCSE CLUB',
    })

    expect(heading).toBeInTheDocument()
  })
})

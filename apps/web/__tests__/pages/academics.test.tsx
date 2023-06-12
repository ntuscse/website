import { render, screen, } from "@testing-library/react";
import '@testing-library/jest-dom';
import Academics from "@/pages/academics";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import { WebLayout } from "@/features/layout";

const MockPage = () => {
  return <ChakraProvider theme={theme}>
    <WebLayout>
      <Academics />
    </WebLayout>
  </ChakraProvider>
}

describe("test", () => {
  it("Heading Exist", () => {
    render(<MockPage />);
    const textElement = screen.getByText(/LINKS TO PYPs/i);
    expect(textElement).toBeInTheDocument();
  })

  it("PYP Questions Link Exist", () => {
    render(<MockPage />);
    const buttonElements = screen.getByRole(/link/i, { name: 'PYP QUESTIONS' });
    expect(buttonElements).toBeInTheDocument();
  })

  it("PYP SOLUTIONS Link Exist", () => {
    render(<MockPage />);
    const buttonElements = screen.getByRole(/link/i, { name: 'PYP SOLUTIONS' });
    expect(buttonElements).toBeInTheDocument();
  })

  it("PYP Questions Link has correct href", () => {
    render(<MockPage />);
    const buttonElements = screen.getByRole(/link/i, { name: 'PYP QUESTIONS' });
    expect(buttonElements).toHaveProperty('href', 'https://ts.ntu.edu.sg/sites/lib-repository/exam-question-papers/_layouts/15/start.aspx#/Shared%20Documents/Forms/AllItems.aspx')
  })

  it("PYP SOLUTIONS Link has correct href", () => {
    render(<MockPage />);
    const buttonElements = screen.getByRole(/link/i, { name: 'PYP SOLUTIONS' });
    expect(buttonElements).toHaveProperty('href', 'https://bit.ly/3CDVXlf')
  })
})

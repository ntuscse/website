import { render, screen, } from "@testing-library/react";
import '@testing-library/jest-dom';
import Sponsors from "@/pages/sponsors";
import { sponsorsData } from "@/features/sponsors";
/*
const MockPage = () => {
  return <ChakraProvider theme={theme}>
    <WebLayout>
      <Academics />
    </WebLayout>
  </ChakraProvider>
}
*/

describe("test", () => {
  it("Heading Exist", () => {
    render(<Sponsors />);
    const textElement = screen.getByRole(/heading/i,{ name : "OUR SPONSORS" });
    expect(textElement).toBeInTheDocument();
  })

  it("Heading Exist", () => {
    render(<Sponsors />);
    const textElement = screen.getByRole(/heading/i,{ name : "OUR SPONSORS" });
    expect(textElement).toBeInTheDocument();
  })

  it("Check sponsors number", () => {
    expect(sponsorsData.length).toBe(15);
  })
})

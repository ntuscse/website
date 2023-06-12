import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import About from "@/pages/about";

describe("test", () => {
  it("About Page Exist", () => {
    render(<About />);
    const textElement = screen.getByText(/About Page/i);
    expect(textElement).toBeInTheDocument();
  })

  it("Go Back Exist", () => {
    render(<About />);
    const textElement = screen.getByText(/Go Back/i);
    expect(textElement).toBeInTheDocument();
  })
})

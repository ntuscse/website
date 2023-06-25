import "@testing-library/jest-dom";

import { renderComponent } from "@/lib/test/providers";
import Contact from "@/pages/contact";

describe("Contact page", () => {
  test("Should render contact heading correctly", () => {
    const screen = renderComponent(<Contact />);

    const contactUs = screen.getByRole("heading", { level: 1 });
    expect(contactUs).toBeInTheDocument();
    expect(contactUs.textContent).toBe("CONTACT US");
  });

  test("Should render email correctly", () => {
    const screen = renderComponent(<Contact />);

    const email = screen.getByTestId("email-text");
    expect(email).toBeInTheDocument();
    expect(email.textContent).toBe("scse-club@e.ntu.edu.sg");
  });

  test("Should render address correctly", () => {
    const screen = renderComponent(<Contact />);

    const address = screen.getByTestId("address-text");
    expect(address).toBeInTheDocument();
    expect(address.textContent).toBe("50 Nanyang Ave, Singapore 639798");
  });
});

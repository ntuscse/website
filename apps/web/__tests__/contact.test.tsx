import "@testing-library/jest-dom";

import { renderComponent } from "@/lib/test/providers";
import Contact from "@/pages/contact";

describe("Contact page", () => {
  test("should render details correctly", () => {
    const screen = renderComponent(<Contact />);
    // expect contact us heading
    const contactUs = screen.getByRole("heading", { level: 1 });
    expect(contactUs).toBeInTheDocument();
    expect(contactUs.textContent).toBe("CONTACT US");

    // expect email to be correct
    const email = screen.getByTestId("email-text");
    expect(email).toBeInTheDocument();
    expect(email.textContent).toBe("scse-club@e.ntu.edu.sg");

    // TODO: expect redirect link to be correct

    // expect address to be correct
    const address = screen.getByTestId("address-text");
    expect(address).toBeInTheDocument();
    expect(address.textContent).toBe("50 Nanyang Ave, Singapore 639798");
  });

  test("should load iframe for map content", () => {
    const screen = renderComponent(<Contact />);

    // expect map to be in document
    // const locationMap = screen.getByRole("iframe")
    // expect(locationMap).toBeTruthy();

    // expect location details to be accurate
  });
});

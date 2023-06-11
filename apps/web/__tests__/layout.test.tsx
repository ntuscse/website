import "@testing-library/jest-dom";
import { renderComponent } from "@/lib/test/providers";
import { Layout } from "ui";
import {
  getMockFooterProps,
  getMockNavProps,
} from "@/lib/test/fixtures/layout";

const mockNavBarProps = getMockNavProps();
const mockFooterProps = getMockFooterProps();

describe("Website layout", () => {
  test("test navbar", () => {
    const screen = renderComponent(
      <Layout navbarProps={mockNavBarProps} footerProps={mockFooterProps}>
        {}
      </Layout>
    );

    const navbar = screen.getByTestId("navbar-container");
    expect(navbar).toBeInTheDocument();

    // expect navbar to contain correct links
    const navbarLinks = screen.getAllByTestId("navbar-link");
    navbarLinks.forEach((elem, idx) => {
      expect(elem).toBeInTheDocument();
      expect(elem).toHaveAttribute("href", mockNavBarProps.links[idx].href);
      expect(elem.textContent).toBe(mockNavBarProps.links[idx].label);
    });

    // expect contact link to be correct
    expect(screen.getByTestId("navbar-contact-link")).toBeInTheDocument;
  });

  test("test footer", () => {
    const screen = renderComponent(
      <Layout navbarProps={mockNavBarProps} footerProps={mockFooterProps}>
        {}
      </Layout>
    );

    const footer = screen.getByTestId("footer-container");
    expect(footer).toBeInTheDocument();

    // expect footer to contain correct links
    const footerLinks = screen.getAllByTestId("footer-link");

    const allFooterLinksProps = [
      ...mockFooterProps.studentLinksGroup.links,
      ...(mockFooterProps.companyLinksGroup?.links ?? []),
    ];

    // expect links to be correct length
    expect(footerLinks).toHaveLength(allFooterLinksProps.length);

    // expect links to have correct detail
    footerLinks.forEach((elem, idx) => {
      expect(elem).toBeInTheDocument();
      expect(elem).toHaveAttribute("href", allFooterLinksProps[idx].href);
      expect(elem.textContent).toBe(allFooterLinksProps[idx].label);
    });

    expect(screen.getByTestId("vercel-powered-icon")).toBeInTheDocument;
    expect(screen.getByTestId("footer-copyright")).toBeInTheDocument;
  });
});

import { render, screen, within, } from "@testing-library/react";
import '@testing-library/jest-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import { WebLayout } from "@/features/layout";

const MockPage = () => {
  return <ChakraProvider theme={theme}>
    <WebLayout>

    </WebLayout>
  </ChakraProvider>
}

describe("test", () => {
  //navigation bar test
 test("header redirect to main page", () => {
   render(<MockPage />);
   const headerElement = screen.getByText("NTU School of Computer Science and Engineering Club").closest("a");
   //get test suite url
   expect(headerElement).toHaveProperty('href', window.location.origin + "/");
 })

  test("Home redirect to main page", () => {
    render(<MockPage />);
    //get navigation bar element
    const navElement = screen.getByRole("navigation");
    //get text, which is inside navigation bar, and find the nearest <a> element
    const textElement = within(navElement).getByText(/Home/).closest("a");
    expect(textElement).toHaveProperty('href', window.location.origin + "/");
  })

  test("About redirect to about page", () => {
    render(<MockPage />);
    const navElement = screen.getByRole("navigation");
    const textElement = within(navElement).getByText(/About/).closest("a");
    expect(textElement).toHaveProperty('href', window.location.origin + "/about");
  })

  test("Events redirect to events page", () => {
    render(<MockPage />);
    const navElement = screen.getByRole("navigation");
    const textElement = within(navElement).getByText(/Events/).closest("a");
    expect(textElement).toHaveProperty('href', window.location.origin + "/events");
  })

  test("Academics redirect to academics page", () => {
    render(<MockPage />);
    const navElement = screen.getByRole("navigation");
    const textElement = within(navElement).getByText(/Academics/).closest("a");
    expect(textElement).toHaveProperty('href', window.location.origin + "/academics");
  })

  test("Learn redirect to learn page", () => {
    render(<MockPage />);
    const navElement = screen.getByRole("navigation");
    const textElement = within(navElement).getByText(/Learn/).closest("a");
    expect(textElement).toHaveProperty('href', window.location.origin + "/learn");
  })

  test("Sponsors redirect to sponsors page", () => {
    render(<MockPage />);
    const navElement = screen.getByRole("navigation");
    const textElement = within(navElement).getByText(/Sponsors/).closest("a");
    expect(textElement).toHaveProperty('href', window.location.origin + "/sponsors");
  })

  //footer test
  test("Academics redirect to academics page", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/link/i, { name: 'Academics' });
    expect(textElement).toHaveProperty('href', window.location.origin + "/academics");
  })

  test("Events redirect to events page", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/link/i, { name: 'Events' });
    expect(textElement).toHaveProperty('href', window.location.origin + "/events");
  })

  test("Join a Subcommittee redirect to join page", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/link/i, { name: 'Join a Subcommittee' });
    expect(textElement).toHaveProperty('href', window.location.origin + "/join");
  })

  test("Learn redirect to learn page", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/link/i, { name: 'Learn' });
    expect(textElement).toHaveProperty('href', window.location.origin + "/learn");
  })

  test("Feedback redirect to contact page", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/link/i, { name: 'Feedback' });
    expect(textElement).toHaveProperty('href', window.location.origin + "/contact");
  })

  test("Sponsors redirect to sponsors page", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/link/i, { name: 'Sponsor Us' });
    expect(textElement).toHaveProperty('href', window.location.origin + "/sponsors");
  })

  test("Contact redirect to contact page", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/link/i, { name: 'Contact' });
    expect(textElement).toHaveProperty('href', window.location.origin + "/contact");
  })

  test("Insta redirect to Insta page", () => {
    render(<MockPage />);
    const textElement = screen.getByText(/Instagram/i).closest("a");
    expect(textElement).toHaveProperty('href', "https://www.instagram.com/ntuscseclub/");
  })

  test("LinkedIn redirect to LinkedIn page", () => {
    render(<MockPage />);
    const textElement = screen.getByText(/LinkedIn/i).closest("a");
    expect(textElement).toHaveProperty('href', "https://sg.linkedin.com/company/ntu-scseclub");
  })

  test("GitHub redirect to GitHub page", () => {
    render(<MockPage />);
    const textElement = screen.getByText(/GitHub/i).closest("a");
    expect(textElement).toHaveProperty('href', "https://github.com/ntuscse");
  })

  test("Vercel link exist", () => {
    render(<MockPage />);
    const textElement = screen.getByRole(/img/i, { name : "Powered by Vercel Branding" }).closest("a");
    expect(textElement).toHaveProperty('href', "https://vercel.com/?utm_source=cse-it&&utm_campaign=oss");
  })

  test("Email exist", () => {
    render(<MockPage />);
    const textElement = screen.getByText("scse-it@e.ntu.edu.sg");
    expect(textElement).toHaveProperty('href', "mailto:scse-it@e.ntu.edu.sg");
  })

  test("Copyright text exist", () => {
    render(<MockPage />);
    const textElement = screen.getByText(/Copyright © .... - NTU SCSE Club/i);
    expect(textElement).toBeInTheDocument();
  })

  test("Copyright text year is the current year", () => {
    render(<MockPage />);
    const textElement = screen.getByText(/Copyright © .... - NTU SCSE Club/i);
    const d = new Date();
    const year = d.getUTCFullYear();
    expect(textElement).toHaveTextContent('Copyright © ' + year.toString() +  ' - NTU SCSE Club');

  })

})

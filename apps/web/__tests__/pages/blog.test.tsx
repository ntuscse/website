import { render,  } from "@testing-library/react";
import '@testing-library/jest-dom'
import { mockBlog } from "@/lib/test/fixtures/blog";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import { WebLayout } from "@/features/layout";
import BlogPost from "@/pages/blog/[slug]";

const MockPage = () => {
  return <ChakraProvider theme={theme}>
    <WebLayout>
      <BlogPost  {...mockBlog['post']}/>
    </WebLayout>
  </ChakraProvider>
}

describe("Blog page", () => {
  test("should render author correctly", () => {
    const screen = render(<MockPage />);
    /*screen.debug(undefined,1000000);*/
    const author = screen.getByText(/Samir Kallias/i);
    expect(author).toBeInTheDocument();
  })

  test("should render content correctly", () => {
    const screen = render(<MockPage />);
    const content = screen.getByText(/consectetur adipiscing elit/i);
    expect(content).toBeInTheDocument();
  })

  test("should render title", () => {
    const screen = render(<MockPage />);
    const title = screen.getByText(/Lorem Ipsum Title/i);
    expect(title).toBeInTheDocument();
  })


  test("should render featured image", () => {
    const screen = render(<MockPage />);
    const image = screen.getAllByRole("img");
    const foundImg = image.find((img) => (img as HTMLImageElement).alt === 'https://www.example.com/image.png');
    expect(foundImg).toBeInTheDocument();
  })
})

import { render,  } from "@testing-library/react";
import '@testing-library/jest-dom'
import { mockBlog } from "@/lib/test/fixtures/blog";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "ui/theme";
import { WebLayout } from "@/features/layout";
import BlogPost from "@/pages/blog/[slug]";
import BlogPostProps from "@/pages/blog/[slug]";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { fetchAPI } from "@/lib/api/wordpress";
import { getStaticProps } from "@/pages/blog/[slug]";
import { ParsedUrlQuery } from "querystring";

jest.mock("@/lib/api/wordpress");
const wordpress = { fetchAPI };


beforeEach(() => {
  jest.clearAllMocks();
})

const renderScreen = async () => {
  const mockedFetchApi = jest.spyOn(wordpress, "fetchAPI");
  mockedFetchApi.mockImplementation(() => {
    return Promise.resolve(mockBlog)
  });
  let context = {
    params: { slug: "lorem-ipsum" as string } as ParsedUrlQuery,
  };
  const { props } = (await getStaticProps(
    context as GetStaticPropsContext
  )) as GetStaticPropsResult<typeof BlogPostProps>;
  return render(<MockPage props={props}/>)
}
const MockPage = ({props}) => {
  return <ChakraProvider theme={theme}>
    <WebLayout>
      <BlogPost  {...props}/>
    </WebLayout>
  </ChakraProvider>
}
describe("Blog page", () => {
  test("should render author correctly", async () => {
    const screen = await renderScreen();
    /*screen.debug(undefined,1000000);*/
    const author = screen.getByText(/Samir Kallias/i);
    expect(author).toBeInTheDocument();
  })

  test("should render content correctly", async () => {
    const screen = await renderScreen();
    const content = screen.getByText(/consectetur adipiscing elit/i);
    expect(content).toBeInTheDocument();
  })

  test("should render title", async () => {
    const screen = await renderScreen();
    const title = screen.getByText(/Lorem Ipsum Title/i);
    expect(title).toBeInTheDocument();
  })


  test("should render featured image", async () => {
    const screen = await renderScreen();
    const image = screen.getAllByRole("img");
    const foundImg = image.find((img) => (img as HTMLImageElement).alt === 'https://www.example.com/image.png');
    expect(foundImg).toBeInTheDocument();
  })
})

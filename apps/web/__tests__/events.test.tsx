import "@testing-library/jest-dom";

import { renderComponent } from "@/lib/test/providers";
import Events from "@/pages/events";
import { getMockEvents } from "@/lib/test/mock/events";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import { removeTextImgTag } from "@/lib/helpers/removeTextImgTag";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import createMockRouter from "@/lib/test/router/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ChakraProvider } from "@chakra-ui/react";

describe("Events page", () => {
  test("should render details correctly", () => {
    const screen = renderComponent(<Events posts={getMockEvents()} />);
    const blogs = screen.getAllByTestId("blog-card");

    // expect length of blogs rendered to be same as mock data
    expect(blogs.length).toBe(getMockEvents().length);

    // expect title to be correct
    const blogsTitles = screen.getAllByTestId("blog-card-title");
    blogsTitles.forEach((title, idx) => {
      expect(title).toBeInTheDocument;
      expect(title.textContent).toEqual(getMockEvents()[idx].node.title);
    });

    // expect date to be correct
    const blogsDates = screen.getAllByTestId("blog-card-date");
    blogsDates.forEach((date, idx) => {
      expect(date).toBeInTheDocument;
      expect(date.textContent).toEqual(
        getDisplayDate(new Date(getMockEvents()[idx].node.date))
      );
    });

    // expect excerpt to be correct
    const blogsExcerpts = screen.getAllByTestId("blog-card-excerpt");
    blogsExcerpts.forEach((excerpt, idx) => {
      expect(excerpt).toBeInTheDocument;
      expect(excerpt.textContent).toEqual(
        removeTextImgTag(getMockEvents()[idx].node.excerpt) + "..."
      );
    });

    // expect image to be rendered to be correctly
    const blogImagesAlt = getMockEvents().map((blog) => blog.node.title);
    for (let i = 0; i < getMockEvents().length; i++) {
      const currentBlog = getMockEvents()[i];
      const blogImage = screen.getByAltText(blogImagesAlt[i]);
      expect(blogImage).toBeInTheDocument();
      expect(blogImage).toHaveAttribute(
        "src",
        currentBlog.node.featuredImage.node.link
      );
    }
  });

  test("should redirect to correct page on click", async () => {
    let router = createMockRouter({});
    const screen = render(
      <RouterContext.Provider value={router}>
        <ChakraProvider>
          <Events posts={getMockEvents()} />
        </ChakraProvider>
      </RouterContext.Provider>
    );
    const blog = screen.getAllByTestId("blog-card")[0];

    waitFor(() => {
      fireEvent.click(blog);
      expect(router.push).toHaveBeenCalledWith(
        "/techterview-101-navigating-the-internship-world"
      );
    });
  });
});

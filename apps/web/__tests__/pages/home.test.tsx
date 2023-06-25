import "@testing-library/jest-dom";
import * as blogsApi from "@/features/blogs/api/getAllBlogPosts";
import { renderComponent } from "@/lib/test/providers";
import { GetStaticPropsContext } from "next";
import Home, { getStaticProps, HomeProps } from "../../pages";
import { ParsedUrlQuery } from "querystring";
import { waitFor } from "@testing-library/react";
import { mockEvents } from "@/lib/test/fixtures/events";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import { removeTextImgTag } from "@/lib/helpers/removeTextImgTag";

jest.mock("@/features/blogs/api/getAllBlogPosts");

const renderScreen = async () => {
  const mockedGetAllBlogs = jest.spyOn(blogsApi, "getAllBlogPosts");
  mockedGetAllBlogs.mockImplementation(() => Promise.resolve(mockEvents));
  const context = {
    params: {} as ParsedUrlQuery,
  };

  const { props } = (await getStaticProps(
    context as GetStaticPropsContext
  )) as { props: HomeProps };

  const screen = renderComponent(<Home posts={props.posts} />);
  return screen;
};

describe("test home page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Should render correct number of blogs", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      // expect blogs to display
      const blogs = screen.getAllByTestId("blog-card");
      expect(blogs.length).toBe(mockEvents.length);
    });
  });

  test("Should render correct titles", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      // expect blogs to display
      const blogs = screen.getAllByTestId("blog-card");
      expect(blogs.length).toBe(mockEvents.length);
    });

    const blogsTitles = screen.getAllByTestId("blog-card-title");
    blogsTitles.forEach((title, idx) => {
      expect(title).toBeInTheDocument;
      expect(title.textContent).toEqual(mockEvents[idx].node.title);
    });
  });

  test("Should render correct dates", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      // expect blogs to display
      const blogs = screen.getAllByTestId("blog-card");
      expect(blogs.length).toBe(mockEvents.length);
    });

    const blogsDates = screen.getAllByTestId("blog-card-date");
    blogsDates.forEach((date, idx) => {
      expect(date).toBeInTheDocument;
      expect(date.textContent).toEqual(
        getDisplayDate(new Date(mockEvents[idx].node.date))
      );
    });
  });

  test("Should render correct excerpts", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      // expect blogs to display
      const blogs = screen.getAllByTestId("blog-card");
      expect(blogs.length).toBe(mockEvents.length);
    });

    const blogsExcerpts = screen.getAllByTestId("blog-card-excerpt");
    blogsExcerpts.forEach((excerpt, idx) => {
      expect(excerpt).toBeInTheDocument;
      expect(excerpt.textContent).toEqual(
        removeTextImgTag(mockEvents[idx].node.excerpt) + "..."
      );
    });
  });

  test("Should render correct blog images", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      // expect blogs to display
      const blogs = screen.getAllByTestId("blog-card");
      expect(blogs.length).toBe(mockEvents.length);
    });

    const blogImagesAlt = mockEvents.map((blog) => blog.node.title);
    for (let i = 0; i < mockEvents.length; i++) {
      const currentBlog = mockEvents[i];
      const blogImage = screen.getByAltText(blogImagesAlt[i]);
      expect(blogImage).toBeInTheDocument();
      expect(blogImage).toHaveAttribute(
        "src",
        currentBlog.node.featuredImage.node.link
      );
    }
  });
});

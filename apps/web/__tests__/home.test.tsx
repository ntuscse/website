import "@testing-library/jest-dom";
import * as moduleApi from "@/features/blogs/api/getAllBlogPosts";
import { renderComponent } from "@/lib/test/providers";
import { GetStaticPropsContext } from "next";
import Home, { getStaticProps, HomeProps } from "../pages";
import { ParsedUrlQuery } from "querystring";
import { waitFor } from "@testing-library/react";
import { getMockEvents } from "@/lib/test/fixtures/events";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import { removeTextImgTag } from "@/lib/helpers/removeTextImgTag";

jest.mock("@/features/blogs/api/getAllBlogPosts");

describe("test home page", () => {
  test("should return", async () => {
    const mockedGeAllBlogs = jest.spyOn(moduleApi, "getAllBlogPosts");
    mockedGeAllBlogs.mockImplementation(() => Promise.resolve(getMockEvents()));
    const context = {
      params: {} as ParsedUrlQuery,
    };

    const { props } = (await getStaticProps(
      context as GetStaticPropsContext
    )) as { props: HomeProps };

    const screen = renderComponent(<Home posts={props.posts} />);

    await waitFor(() => {
      // expect blogs to display
      const blogs = screen.getAllByTestId("blog-card");

      // expect length of blogs rendered to be same as mock data
      expect(blogs.length).toBe(getMockEvents().length);
    });

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
});

import "@testing-library/jest-dom";

import { renderComponent } from "@/lib/test/providers";
import Events from "@/pages/events";
import { mockEvents } from "@/lib/test/fixtures/events";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import { removeTextImgTag } from "@/lib/helpers/removeTextImgTag";

describe("Events page", () => {
  test("Should render correct number of blogs", () => {
    const screen = renderComponent(<Events posts={mockEvents} />);
    const blogs = screen.getAllByTestId("blog-card");
    expect(blogs.length).toBe(mockEvents.length);
  });
  test("Should render correct titles", () => {
    const screen = renderComponent(<Events posts={mockEvents} />);
    const blogsTitles = screen.getAllByTestId("blog-card-title");
    blogsTitles.forEach((title, idx) => {
      expect(title).toBeInTheDocument;
      expect(title.textContent).toEqual(mockEvents[idx].node.title);
    });
  });
  test("Should render correct dates", () => {
    const screen = renderComponent(<Events posts={mockEvents} />);
    const blogsDates = screen.getAllByTestId("blog-card-date");
    blogsDates.forEach((date, idx) => {
      expect(date).toBeInTheDocument;
      expect(date.textContent).toEqual(
        getDisplayDate(new Date(mockEvents[idx].node.date))
      );
    });
  });
  test("Should render correct excerpts", () => {
    const screen = renderComponent(<Events posts={mockEvents} />);
    const blogsExcerpts = screen.getAllByTestId("blog-card-excerpt");
    blogsExcerpts.forEach((excerpt, idx) => {
      expect(excerpt).toBeInTheDocument;
      expect(excerpt.textContent).toEqual(
        removeTextImgTag(mockEvents[idx].node.excerpt) + "..."
      );
    });
  });
  test("Should render correct images", () => {
    const screen = renderComponent(<Events posts={mockEvents} />);
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

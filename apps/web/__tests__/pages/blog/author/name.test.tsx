import "@testing-library/jest-dom";
import { fetchAPI } from "@/lib/api/wordpress";
import { renderComponent } from "@/lib/test/providers";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPropsContext } from "next";
import AuthorBlogs, {
  AuthorBlogsProps,
  getStaticProps,
} from "@/pages/blog/author/[name]";
import { mockAllBlogs } from "@/lib/test/fixtures/blog";
import { waitFor } from "@testing-library/react";
import { GetAllBlogPostsResponse } from "@/features/blogs";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";

jest.mock("@/lib/api/wordpress");
const wordpress = { fetchAPI };

const renderScreen = async () => {
  const mockedFetchApi = jest.spyOn(wordpress, "fetchAPI");
  mockedFetchApi.mockImplementation(() => {
    const response = mockAllBlogs as GetAllBlogPostsResponse;

    // Format response
    response.posts.edges = response.posts.edges.map((edge) => ({
      ...edge,
      node: {
        ...edge.node,
        excerpt: edge.node.excerpt
          .replace(/<[^>]+>/g, "")
          .replace(/\n/g, " ")
          .replace(/;&nbsp;/g, '"')
          .substring(0, 120),
      },
    }));
    return Promise.resolve(response);
  });

  // should generate correct data for acad
  let context = {
    params: { name: "acad" as string } as ParsedUrlQuery,
  };
  const { props } = (await getStaticProps(
    context as GetStaticPropsContext
  )) as {
    props: AuthorBlogsProps;
  };
  const screen = renderComponent(<AuthorBlogs posts={props.posts} />);
  return screen;
};

const filteredBlogs = mockAllBlogs as GetAllBlogPostsResponse;
filteredBlogs.posts.edges = filteredBlogs.posts.edges.filter(
  (edge) => edge.node.author.node.name === "acad"
);

// Format filteredBlogs
filteredBlogs.posts.edges = filteredBlogs.posts.edges.map((edge) => ({
  ...edge,
  node: {
    ...edge.node,
    excerpt: edge.node.excerpt
      .replace(/<[^>]+>/g, "")
      .replace(/\n/g, " ")
      .replace(/;&nbsp;/g, '"')
      .substring(0, 120),
  },
}));

describe("test author page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Should generate correct data for author acad", async () => {
    const mockedFetchApi = jest.spyOn(wordpress, "fetchAPI");
    mockedFetchApi.mockImplementation(() => Promise.resolve(mockAllBlogs));

    let context = {
      params: { name: "acad" as string } as ParsedUrlQuery,
    };
    const { props: props1 } = (await getStaticProps(
      context as GetStaticPropsContext
    )) as { props: AuthorBlogsProps };

    expect(props1.posts).toHaveLength(2);
    props1.posts.forEach((post) => {
      expect(post.node.author.node.name).toBe("acad");
    });
  });

  test("Should display correct titles for a specific author", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      const blogs = screen.getAllByTestId("blog-grid");
      // expect length of blogs rendered to be same as mock data for acad
      expect(blogs.length).toBe(filteredBlogs.posts.edges.length);
    });

    const blogsTitles = screen.getAllByTestId("blog-grid-title");
    blogsTitles.forEach((title, idx) => {
      expect(title).toBeInTheDocument;
      expect(title.textContent).toEqual(
        filteredBlogs.posts.edges[idx].node.title
      );
    });
  });

  test("Should display correct blog dates for a specific author", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      const blogs = screen.getAllByTestId("blog-grid");
      // expect length of blogs rendered to be same as mock data for acad
      expect(blogs.length).toBe(filteredBlogs.posts.edges.length);
    });

    const blogsDates = screen.getAllByTestId("blog-grid-date");
    blogsDates.forEach((date, idx) => {
      expect(date).toBeInTheDocument;
      expect(date.textContent).toEqual(
        ` / ${getDisplayDate(
          new Date(filteredBlogs.posts.edges[idx].node.date)
        )}`
      );
    });
  });

  test("Should display correct blog excerpts for a specific author", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      const blogs = screen.getAllByTestId("blog-grid");
      // expect length of blogs rendered to be same as mock data for acad
      expect(blogs.length).toBe(filteredBlogs.posts.edges.length);
    });

    const blogsExcerpts = screen.getAllByTestId("blog-grid-excerpt");
    blogsExcerpts.forEach((excerpt, idx) => {
      expect(excerpt).toBeInTheDocument;
      expect(excerpt.textContent).toEqual(
        filteredBlogs.posts.edges[idx].node.excerpt + "..."
      );
    });
  });

  test("Should display correct blog images for a specific author", async () => {
    const screen = await renderScreen();

    await waitFor(() => {
      const blogs = screen.getAllByTestId("blog-grid");
      // expect length of blogs rendered to be same as mock data for acad
      expect(blogs.length).toBe(filteredBlogs.posts.edges.length);
    });

    const blogsImage = screen.getAllByTestId("blog-grid-img");
    blogsImage.forEach((img, idx) => {
      expect(img).toBeInTheDocument;

      // expect img have correct href
      expect(img).toHaveAttribute(
        "href",
        `/blog/${filteredBlogs.posts.edges[idx].node.slug}`
      );

      // expect image details to be correct
      expect(img.childNodes[0]).toHaveAttribute(
        "alt",
        filteredBlogs.posts.edges[idx].node.title
      );
    });
  });
});

import "@testing-library/jest-dom";
import { fetchAPI } from "@/lib/api/wordpress";
import { renderComponent } from "@/lib/test/providers";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPropsContext } from "next";
import AuthorBlogs, {
  AuthorBlogsProps,
  getStaticProps,
} from "@/pages/blog/author/[name]";
import {
  getMockAllBlogs,
} from "@/lib/test/fixtures/blog";
import { waitFor} from "@testing-library/react";
import { GetAllBlogPostsResponse} from "@/features/blogs";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";

jest.mock("@/lib/api/wordpress");
const wordpress = { fetchAPI };

describe("test author name slug", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should generate correct data for different authors", async () => {
    const mockedFetchApi = jest.spyOn(wordpress, "fetchAPI");
    mockedFetchApi.mockImplementation(() => Promise.resolve(getMockAllBlogs()));

    // should generate correct data for acad
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

    // should generate correct data for Samir Kallias
    context = {
      params: { name: "Samir Kallias" as string } as ParsedUrlQuery,
    };
    let { props: props2 } = (await getStaticProps(
      context as GetStaticPropsContext
    )) as { props: AuthorBlogsProps };

    expect(props2.posts).toHaveLength(1);
    props2.posts.forEach((post) => {
      expect(post.node.author.node.name).toBe("Samir Kallias");
    });
  });

  test("should display correct blogs for each author", async () => {
    const mockedFetchApi = jest.spyOn(wordpress, "fetchAPI");
    mockedFetchApi.mockImplementation(() => {
      const response = getMockAllBlogs() as GetAllBlogPostsResponse

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
  }))
      return Promise.resolve(response)
    });

    // should generate correct data for acad
    let context = {
      params: { name: "acad" as string } as ParsedUrlQuery,
    };
    const { props } = (await getStaticProps(
      context as GetStaticPropsContext
    )) as { props: AuthorBlogsProps };

    const screen = renderComponent(<AuthorBlogs posts={props.posts} />);
      
    let filteredBlogs = getMockAllBlogs() as GetAllBlogPostsResponse;
    filteredBlogs.posts.edges = filteredBlogs.posts.edges.filter(edge => edge.node.author.node.name === "acad")
    
      // Format filteredBlogs
    filteredBlogs.posts.edges = filteredBlogs.posts.edges.map(edge => ({
    ...edge,
    node: {
      ...edge.node,
      excerpt: edge.node.excerpt
        .replace(/<[^>]+>/g, "")
        .replace(/\n/g, " ")
        .replace(/;&nbsp;/g, '"')
        .substring(0, 120),
    },
    }))
    
    await waitFor(() => {
      // expect blogs to display
      const blogs = screen.getAllByTestId("blog-grid");

      // expect length of blogs rendered to be same as mock data for acad
      expect(blogs.length).toBe(filteredBlogs.posts.edges.length);
    });

    // expect title to be correct
    const blogsTitles = screen.getAllByTestId("blog-grid-title");
    blogsTitles.forEach((title, idx) => {
      expect(title).toBeInTheDocument;
      expect(title.textContent).toEqual(filteredBlogs.posts.edges[idx].node.title);
    });

    // expect date to be correct
    const blogsDates = screen.getAllByTestId("blog-grid-date");
    blogsDates.forEach((date, idx) => {
      expect(date).toBeInTheDocument;
      expect(date.textContent).toEqual(
        ` / ${getDisplayDate(new Date(filteredBlogs.posts.edges[idx].node.date))}`
      );
    });

    // expect excerpt to be correct
    const blogsExcerpts = screen.getAllByTestId("blog-grid-excerpt");
    blogsExcerpts.forEach((excerpt, idx) => {
      expect(excerpt).toBeInTheDocument;
      expect(excerpt.textContent).toEqual(
        filteredBlogs.posts.edges[idx].node.excerpt + "..."
      );
    });

    // expect image link to be correct
    const blogsImage = screen.getAllByTestId("blog-grid-img")
    blogsImage.forEach((img, idx) => {
      expect(img).toBeInTheDocument;

      // expect img have correct href
      expect(img).toHaveAttribute("href", `/blog/${filteredBlogs.posts.edges[idx].node.slug}`)

      // expect image details to be correct
      expect(img.childNodes[0]).toHaveAttribute("alt", filteredBlogs.posts.edges[idx].node.title)
    });
  });
});

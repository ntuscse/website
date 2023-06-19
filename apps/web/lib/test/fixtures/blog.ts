import {
  GetBlogPostResponse,
  GetAllBlogPostsResponse,
} from "@/features/blogs";

export const mockBlog: GetBlogPostResponse = {
  post: {
    author: {
      node: {
        id: "ABC123",
        name: "Samir Kallias",
      },
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "February 22, 2022",
    featuredImage: {
      node: {
        link: "https://www.example.com/image.png",
      },
    },
    id: "CDE123",
    slug: "lorem-ipsum",
    status: "publish",
    title: "Lorem Ipsum Title",
    uri: "/lorem-ipsum/",
  },
};

export const getMockBlogAuthorSlugs = () =>
  ({
    edges: [
      {
        node: {
          id: "cG9zdDoxNjk1",
          slug: "techterview-101-navigating-the-internship-world",
        },
      },
      { node: { id: "cG9zdDoxMTYy", slug: "21st-main-committee" } },
      { node: { id: "cG9zdDo3NTA=", slug: "scse-dinner-dance-2019" } },
    ],
  } as GetAllBlogPostsResponse["posts"]);

export const getMockAllBlogs = () =>
  ({
    posts: {
      edges: [
        {
          node: {
            id: "cG9zdDoxNjk1",
            title: "Techterview 101: Navigating the Internship World",
            date: "2022-02-22T13:58:38",
            uri: "/techterview-101-navigating-the-internship-world/",
            slug: "techterview-101-navigating-the-internship-world",
            excerpt:
              "Techterview 101: Navigating the Internship World, a senior sharing event for the SCSE",
            author: {
              node: {
                id: "ABC123",
                name: "acad",
              },
            },
            featuredImage: {
              node: {
                link: "https://www.example.com/image.png",
              },
            },
          },
        },
        {
          node: {
            id: "cG9zdDoxMTYy",
            title: "21st Main Committee",
            date: "2021-03-31T16:07:43",
            uri: "/21st-main-committee/",
            slug: "21st-main-committee",
            excerpt:
              "Introducing the 21st Main Committee Mission of 21st Main Committee School of Computer Science and Engineering Club (CSEC Club) is a student organisation established to improve the welfare and student lives of SCSE Students. We aim to enrich student’s university life, meet students’ needs, be the voice of SCSE-ians",
            author: {
              node: {
                id: "ABC123",
                name: "acad",
              },
            },
            featuredImage: {
              node: {
                link: "https://www.example.com/image.png",
              },
            },
          },
        },
        {
          node: {
            id: "cG9zdDo3NTA=",
            title: "SCSE Dinner & Dance 2019",
            date: "2020-01-15T20:25:28",
            uri: "/scse-dinner-dance-2019/",
            slug: "scse-dinner-dance-2019",
            excerpt:
              '<p>SCSE Dinner &amp; Dance 2019 &nbsp; &nbsp; The School of Computer Science and Engineering (SCSE) hosted its annual Dinner &amp; Dance on 11th September 19 at the Novotel Singapore on Stevens. The annual Dinner &amp; Dance is always seen as the event to look forward to for undergraduates as it marks an important milestone in&hellip;&nbsp;<a href="https://clubs.ntu.edu.sg/csec/scse-dinner-dance-2019/" class="" rel="bookmark">Read More &raquo;<span class="screen-reader-text">SCSE Dinner &#038; Dance 2019</span></a></p>\n',
            author: {
              node: {
                id: "EFG123",
                name: "Samir Kallias",
              },
            },
            featuredImage: {
              node: {
                link: "https://www.example.com/image.png",
              },
            },
          },
        },
      ],
    },
  } as Record<string, any>);

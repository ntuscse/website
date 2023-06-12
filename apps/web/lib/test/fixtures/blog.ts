import { GetBlogPostResponse } from "@/features/blogs";

export const mockBlog: GetBlogPostResponse = {
  post: {
    author: {
      node: {
        id: "ABC123",
        name: "Samir Kallias"
      }
    },
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "February 22, 2022",
    featuredImage: {
      node: {
        link: "https://www.example.com/image.png"
      }
    },
    id: "CDE123",
    slug: "lorem-ipsum",
    status: "publish",
    title: "Lorem Ipsum Title",
    uri: "/lorem-ipsum/"
  }

}

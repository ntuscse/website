import { GetStaticProps, GetStaticPropsResult } from "next";
import { BlogGridDisplay, BlogGridDisplayProps, getAllBlogPosts } from "@/features/blogs";

export interface BlogProps {
  posts: BlogGridDisplayProps["posts"];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <BlogGridDisplay posts={posts} />
  );
};

export default Blog;

// This function gets called at build time
export const getStaticProps: GetStaticProps<any> = async (_context) => {
  const posts = await getAllBlogPosts();

  return {
    props: {
      posts: posts
    },
    revalidate: 10,
  } as GetStaticPropsResult<BlogProps>;
};

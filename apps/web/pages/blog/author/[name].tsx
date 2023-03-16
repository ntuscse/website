import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult
} from "next";
import {
  BlogFilterEnum,
  BlogGridDisplay,
  BlogGridDisplayProps,
  getAllBlogPosts,
  getAllBlogPostsSlugs
} from "@/features/blogs";

interface AuthorBlogsProps {
  posts: BlogGridDisplayProps["posts"];
}

const AuthorBlogs = ({ posts }: AuthorBlogsProps) => {
  return (
    <BlogGridDisplay posts={posts} />
  );
}

export default AuthorBlogs;

// this function gets called at build time
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  // With Filtering
  const posts = await getAllBlogPosts(
    { key: params?.name as string, category: BlogFilterEnum.AUTHOR })

  return {
    props: {
      posts: posts
    },
    revalidate: 10,
  } as GetStaticPropsResult<AuthorBlogsProps>;
}

// this function gets called at build time
// this defines a list of paths to be statically generated.
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllBlogPostsSlugs();

  return {
    paths: data.edges.map((edge) => `/blog/author/${edge.node.author ? edge.node.author.node.name : 'no-author'}`),
    fallback: true,
  } as GetStaticPathsResult;
}

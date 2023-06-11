import { VStack } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { HomeHero } from "@/features/home";
import {
  BlogCardsDisplay,
  BlogCardsDisplayProps,
  getAllBlogPosts,
} from "@/features/blogs";

export interface HomeProps {
  posts: BlogCardsDisplayProps["posts"];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <HomeHero />
      <VStack mx={{ base: 5, lg: 10 }} pt={12}>
        <BlogCardsDisplay posts={posts.slice(0, 6)} />
      </VStack>
    </>
  );
};

export default Home;

// This function gets called at build time
export const getStaticProps: GetStaticProps<any> = async (_context) => {
  const posts = await getAllBlogPosts();

  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  } as GetStaticPropsResult<HomeProps>;
};

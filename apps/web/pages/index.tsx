import { FooterContentButton } from "ui";
import { VStack } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { getAllBlogPosts } from "lib/api/wordpress";
import { BlogProps } from "./blog";
import { HomeHero } from "@/features/home";
import { BlogCardsDisplay } from "@/features/blogs";

type HomeProps = BlogProps;

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <HomeHero />
      <VStack mx={{ base: 5, lg: 10 }} pt={12}>
        <BlogCardsDisplay posts={posts.slice(0, 6)} />
      </VStack>
      <FooterContentButton
        href="./contact"
        label="Contact Us"
        title="Let’s work together"
      />
    </>
  );
};

export default Home;

// This function gets called at build time
export const getStaticProps: GetStaticProps<any> = async (_context) => {
  const data = await getAllBlogPosts();

  return {
    props: {
      posts: data.edges.map((edge) => ({
        ...edge,
        node: {
          ...edge.node,
          excerpt: edge.node.excerpt
            .replace(/<[^>]+>/g, "")
            .replace(/\n/g, " ")
            .replace(/;&nbsp;/g, '"')
            .substring(0, 200),
        },
      })),
    },
    revalidate: 10,
  } as GetStaticPropsResult<BlogProps>;
};

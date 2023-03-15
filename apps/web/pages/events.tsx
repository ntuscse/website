import { VStack, Heading } from "@chakra-ui/react";
import { getAllBlogPosts } from "lib/api/wordpress";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { FooterContentButton, Hero } from "ui";
import { BlogProps } from "./blog";
import { BlogCardsDisplay } from "@/features/blogs";

type EventsProps = BlogProps;

const Events = ({ posts }: EventsProps) => {
  return (
    <>
      <Hero
        backgroundImage="/heroes/events-banner.png"
        backgroundGradient="linear(to-r, whiteAlpha.500, whiteAlpha.500)"
      />

      {/* Blog Cards */}
      <VStack mx={{ base: 5, lg: 10 }}>
        <Heading p={5}>Recent/Ongoing Events</Heading>
        <BlogCardsDisplay posts={posts} />
      </VStack>

      {/* Extra Footer Content */}
      <FooterContentButton
        href="./contact"
        label="Contact Us"
        title="Let's Talk"
      />
    </>
  );
};

export default Events;

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
            .substring(0, 120),
        },
      })),
    },
    revalidate: 10,
  } as GetStaticPropsResult<BlogProps>;
};

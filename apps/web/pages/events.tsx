import { VStack, Heading } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { FooterContentButton, Hero } from "ui";
import { BlogCardsDisplay, BlogCardsDisplayProps, getAllBlogPosts } from "@/features/blogs";

interface EventsProps {
  posts: BlogCardsDisplayProps["posts"];
}

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
  const posts = await getAllBlogPosts();

  return {
    props: {
      posts: posts
    },
    revalidate: 10,
  } as GetStaticPropsResult<EventsProps>;
};

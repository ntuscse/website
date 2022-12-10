import { VStack, Heading, Grid, GridItem } from "@chakra-ui/react";
import { getAllBlogPosts } from "lib/api/wordpress";
import { getDisplayDate } from "lib/helpers/getDisplayDate";
import { removeTextImgTag } from "lib/helpers/removeTextImgTag";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { BlogCard, FooterContentButton, Hero } from "ui";
import { BlogProps } from "./blog";

type EventsProps = BlogProps;

const Events = ({ posts }: EventsProps) => {
  return (
    <>
      <Hero
        backgroundImage="/heroes/events-banner.png"
        backgroundGradient="linear(to-r, whiteAlpha.500, whiteAlpha.500)"
      />
      <VStack mx={{ base: 5, lg: 10 }}>
        <Heading p={5}>Recent/Ongoing Events</Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={12}
          pb={32}
        >
          {posts.map((post) => (
            <GridItem key={post.node.slug}>
              <BlogCard
                href={`blog/${post.node.slug}`}
                blogCardImageProps={{
                  src: post.node.featuredImage?.node?.link ?? "",
                  alt: "",
                }}
                blogCardContentProps={{
                  title: post.node.title,
                  body: removeTextImgTag(post.node.excerpt) + "...",
                  date: getDisplayDate(new Date(post.node.date)),
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </VStack>
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

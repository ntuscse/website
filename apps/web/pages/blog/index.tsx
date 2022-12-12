import { Text, Heading, Box, Grid, GridItem } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { getAllBlogPosts } from "../../lib/api/wordpress";
import { GetAllBlogPostsResponse } from "../../lib/types/wordpress";
import Image from "next/image";
import Link from "next/link";
import { getDisplayDate } from "../../lib/helpers/getDisplayDate";

export interface BlogProps {
  posts: GetAllBlogPostsResponse["posts"]["edges"];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Box p="50px" display="flex" justifyContent="center">
      <Grid
        templateColumns={{ base: "1fr", lg: "0.5fr 1fr" }}
        rowGap={{ base: "20px", lg: "75px" }}
        columnGap="20px"
        maxW={1100}
      >
        {posts.map((post) => {
          return (
            <>
              <GridItem
                key={`blog-image-${post.node.id}`}
                position="relative"
                mb={{ base: 4, lg: 0 }}
              >
                {post.node.featuredImage && (
                  <Link href={`blog/${post.node.slug}`}>
                    <Image
                      src={post.node.featuredImage.node.link}
                      alt={post.node.title}
                      height={1000}
                      width={1000}
                    />
                  </Link>
                )}
              </GridItem>
              <GridItem
                key={post.node.id + post.node.title}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                mb={{ base: 6, lg: 0 }}
              >
                <Link href={`blog/${post.node.slug}`}>
                  <Heading
                    size="lg"
                    mb="12px"
                    _hover={{ color: "gray.600", cursor: "pointer" }}
                  >
                    {post.node.title}
                  </Heading>
                </Link>
                <Text fontWeight="light" fontSize="13px">
                  {`by ${post.node.author?.node?.name} / ${getDisplayDate(
                    new Date(post.node.date)
                  )} `}
                </Text>
                <Text noOfLines={2} mt={2} alignSelf="start" fontSize="14px">
                  {post.node.excerpt + "..."}
                </Text>
              </GridItem>
            </>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Blog;

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

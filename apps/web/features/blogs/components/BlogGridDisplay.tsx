import { Box, BoxProps, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import { GetAllBlogPostsResponse } from "@/lib/types/wordpress";

export interface BlogGridDisplayProps extends BoxProps {
  posts: GetAllBlogPostsResponse["posts"]["edges"]
}

export const BlogGridDisplay = (props: BlogGridDisplayProps) => {
  const { posts, ...boxProps } = props;

  return (
    <Box p="50px" display="flex" justifyContent="center" {...boxProps}>
      <Grid
        templateColumns={{ base: "1fr", lg: "0.5fr 1fr" }}
        rowGap={{ base: "20px", lg: "75px" }}
        columnGap="20px"
        maxW={1100}
      >
        {posts?.map((post) => {
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
                <Link href={`/blog/${post.node.slug}`}>
                  <Heading
                    size="lg"
                    mb="12px"
                    _hover={{ color: "gray.600", cursor: "pointer" }}
                  >
                    {post.node.title}
                  </Heading>
                </Link>
                <Text fontWeight="light" fontSize="13px">
                  by <Link href={`/blog/author/${post.node.author ? post.node.author.node.name : 'no-author'}`}><Text as="span" color="blue.700" fontWeight="bold" _hover={{ textDecoration: "underline" }}>{post.node.author?.node?.name}</Text></Link>
                  <Text as="span">{' '}/ {getDisplayDate(new Date(post.node.date))}</Text>
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

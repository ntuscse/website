import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getAllBlogPostsSlugs, getAllBlogPosts } from "../../../lib/api/wordpress";
import { GetAllBlogPostsResponse } from "../../../lib/types/wordpress";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { getDisplayDate } from "../../../lib/helpers/getDisplayDate";

interface AuthorBlogsProps {
  posts: GetAllBlogPostsResponse["posts"]["edges"]
}

const AuthorBlogs = ({ posts }: AuthorBlogsProps) => {
  return (
    <Box p="50px" display="flex" justifyContent="center">
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
}

export default AuthorBlogs;

// this function gets called at build time
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  // const data = await getAllBlogPostsByAuthor(params?.name as string);
  const data = await getAllBlogPosts()

  // filter by author
  data.edges = data.edges.filter((edge) => {
    if (edge.node.author) {
      return edge.node.author.node.name === params?.name as string;
    } else {
      // no author
      return !edge.node.author && params?.name === 'no-author';
    }
  })

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

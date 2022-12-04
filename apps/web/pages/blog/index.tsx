import { Text, Heading, Box, Grid, GridItem } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { getAllBlogPosts } from "../../lib/api/wordpress";
import { GetAllBlogPostsResponse } from "../../lib/types/wordpress";
import Image from "next/image";
import Link from "next/link";
import { getDisplayDate } from "../../lib/helpers/getDisplayDate";

interface BlogProps {
    posts: GetAllBlogPostsResponse["posts"]["edges"]
}

const Blog = ({ posts }: BlogProps) => {
    return (
        <Box p="50px" display="flex" justifyContent="center">
            <Grid
                templateColumns={{ base: '1fr', lg: '0.5fr 1fr' }}
                rowGap={{ base: "20px", lg: "75px" }}
                columnGap="20px"
                maxW={1100}>
                {posts.map(post => {
                    return (
                        <>
                            <GridItem key={`blog-image-${post.node.id}`} position="relative">
                                {post.node.featuredImage &&
                                    <Image
                                        src={post.node.featuredImage.node.link}
                                        alt={post.node.title}
                                        height={250}
                                        width={415}
                                        // fill={true}
                                        />}
                            </GridItem>
                            <GridItem
                                key={post.node.id + post.node.title}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center">
                                <Heading size={{ base: "md", md: "lg" }} mb="12px">{post.node.title}</Heading>
                                <Text fontWeight="light" fontSize="13px">by {post.node.author?.node?.name} / {getDisplayDate(new Date(post.node.date))}</Text>
                            </GridItem>
                        </>
                    )
                })}
            </Grid>
      {/*<Flex align="center" justify="center" padding={10}>*/}
      {/*    <SimpleGrid columns={[1,1,1,2]} spacing={12}>*/}
      {/*        {posts.map(post => (*/}
      {/*          <Link href={`blog/${post.node.slug}`}>*/}
      {/*            <SimpleGrid maxWidth='480px' key={post.node.slug} columns={[1, 1, 1, 2]} width ={600} spacing={5}>*/}
      {/*              {post.node.featuredImage &&*/}
      {/*                  <Box maxW="960px" mx="auto" >*/}
      {/*                      <Image width="300"*/}
      {/*                             height="200"*/}
      {/*                             src={post.node.featuredImage.node.link}  alt=""/>*/}
      {/*                  </Box>}*/}
      {/*              <Flex flexDirection="column" justifyContent="flex-start">*/}
      {/*                <Text fontWeight="bold" fontSize={[ '16px', '18px','20px', '24px']}>{post.node.title}</Text>*/}
      {/*                <Text>by {post.node.author?.node?.name} / {post.node.date}</Text>*/}
      {/*              </Flex>*/}
      {/*            </SimpleGrid>*/}
      {/*          </Link>*/}
      {/*        ))}*/}
      {/*    </SimpleGrid>*/}
      {/*</Flex>*/}
    </Box>
  )
}

export default Blog

// This function gets called at build time
export const getStaticProps: GetStaticProps<any> = async (
  _context
) => {
  const data = await getAllBlogPosts()

  return {
    props: {
      posts: data.edges
    },
    revalidate: 10,
  } as GetStaticPropsResult<BlogProps>
}

import { SimpleGrid, Text, Flex, Box } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { getAllBlogPosts } from "../../lib/api/wordpress";
import { GetAllBlogPostsResponse } from "../../lib/types/wordpress";
import Image from "next/image";
import Link from "next/link";

interface BlogProps {
  posts: GetAllBlogPostsResponse["posts"]["edges"]
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <>
      <Flex align="center" justify="center" padding={10}>
          <SimpleGrid columns={[1,1,1,2]} spacing={12}>
              {posts.map(post => (
                <Link href={`blog/${post.node.slug}`}>
                  <SimpleGrid maxWidth='480px' key={post.node.slug} columns={[1, 1, 1, 2]} width ={600} spacing={5}>
                    {post.node.featuredImage &&
                        <Box maxW="960px" mx="auto" >
                            <Image width="300"
                                   height="200"
                                   src={post.node.featuredImage.node.link}  alt=""/>
                        </Box>}
                    <Flex flexDirection="column" justifyContent="flex-start">
                      <Text fontWeight="bold" fontSize={[ '16px', '18px','20px', '24px']}>{post.node.title}</Text>
                      <Text>by {post.node.author?.node?.name} / {post.node.date}</Text>
                    </Flex>
                  </SimpleGrid>
                </Link>
              ))}
          </SimpleGrid>
      </Flex>
    </>
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

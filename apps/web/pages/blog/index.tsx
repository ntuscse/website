import { HStack, Text, VStack } from "@chakra-ui/react";
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
      <VStack>
        {posts.map(post => (
          <Link href={`blog/${post.node.slug}`}>
            <HStack key={post.node.slug} my={4}>
              {post.node.featuredImage && <Image width={200} height={150} src={post.node.featuredImage.node.link}  alt=""/>}
              <VStack>
                <Text>{post.node.title}</Text>
                <Text>by {post.node.author?.node?.name} / {post.node.date}</Text>
              </VStack>
            </HStack>
          </Link>
        ))}
      </VStack>
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

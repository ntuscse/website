import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { getAllBlogPostsSlugs, getBlogPost } from "../../lib/api/wordpress";
import { GetBlogPostResponse } from "../../lib/types/wordpress";
import { Box, Heading, Text } from "@chakra-ui/react";
import { getDisplayDate } from "../../lib/helpers/getDisplayDate";
import Image from 'next/image'

type BlogPostProps = GetBlogPostResponse["post"]

const BlogPost = (props: BlogPostProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p="50px">
      <Box textAlign="left" w="100%" maxW="720px" mb="50px">
        <Heading size={{ base: "md", md: "lg" }} mb="8px">{props.title}</Heading>
        <Text fontWeight="light" fontSize="13px">by {props.author?.node?.name} / {getDisplayDate(new Date(props.date))}</Text>
        {props.featuredImage &&
          <Box w="100%" position="relative" style={{ aspectRatio: 1.5 }} mt="50px">
            <Image fill={true} src={props.featuredImage.node.link}  alt={props.featuredImage.node.link}/>
          </Box>}
      </Box>

      <Box margin="auto" maxWidth="720px" dangerouslySetInnerHTML={{ __html: props.content }} />
    </Box>
  )
}

export default BlogPost;

// this function gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const data = await getBlogPost(params?.slug as string);

  return {
    props: data,
    revalidate: 10
  } as GetStaticPropsResult<BlogPostProps>
}

// this function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllBlogPostsSlugs()

  return {
    paths: data.edges.map(edge => `/blog/${edge.node.slug}`),
    fallback: true
  } as GetStaticPathsResult
}

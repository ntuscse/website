import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { getAllBlogPosts, getBlogPost } from "../../lib/api/wordpress";
import { GetBlogPostResponse } from "../../lib/types/wordpress";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

type BlogPostProps = GetBlogPostResponse["post"]

const BlogPost = (props: BlogPostProps) => {
  return <>
    <Text>{props.title}</Text>
    <Text><>{props.author.node.name} / {props.date}</></Text>
    {props.featuredImage && <Image width={200} height={150} src={props.featuredImage.node.link}  alt=""/>}
    {/*<Text>{props.content}</Text>*/}
    <Box margin="auto" maxWidth="720px" dangerouslySetInnerHTML={{ __html: props.content }} />
  </>
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
  const data = await getAllBlogPosts()

  return {
    paths: data.edges.map(edge => `/blog/${edge.node.slug}`),
    fallback: true
  } as GetStaticPathsResult
}

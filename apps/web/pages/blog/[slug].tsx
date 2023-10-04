import { Box, Heading, Text } from "@chakra-ui/react";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import Image from "next/image";
import Link from "next/link";
import { GetBlogPostResponse } from "@/features/blogs";

type BlogPostProps = GetBlogPostResponse["post"];

const BlogPost = (props: BlogPostProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p="50px">
      <Box textAlign="left" w="100%" maxW="720px" mb="50px">
        <Heading size={{ base: "md", md: "lg" }} mb="8px">
          {props.title}
        </Heading>
        <Text fontWeight="light" fontSize="13px">
          by <Link href={`/blog/author/${props.author ? props.author.node.name : 'no-author'}`}><Text as="span" color="blue.700" fontWeight="bold" _hover={{ textDecoration: "underline" }}>{props.author?.node?.name}</Text></Link>
          <Text as="span">{' '}/ {getDisplayDate(new Date(props.date))}</Text>
        </Text>
        {/* Image needed as it is the primary image of the blog (it is also used as the thumbnail) */}
        {props.featuredImage && (
          <Box
            w="100%"
            position="relative"
            style={{ aspectRatio: 1.5 }}
            mt="50px"
          >
            <Image
              fill={true}
              src={props.featuredImage.node.link}
              alt={props.featuredImage.node.link}
            />
          </Box>
        )}
      </Box>

      <Box
        margin="auto"
        maxWidth="720px"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </Box>
  );
};

export default BlogPost;

// this function gets called at build time
// export const getStaticProps: GetStaticProps = async ({
//   params,
// }: GetStaticPropsContext) => {
//   const data = await getBlogPost(params?.slug as string);
//
//   return {
//     props: data,
//     revalidate: 10,
//   } as GetStaticPropsResult<BlogPostProps>;
// };
//
// // this function gets called at build time
// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await getAllBlogPostsSlugs();
//
//   return {
//     paths: data.edges.map((edge) => `/blog/${edge.node.slug}`),
//     fallback: true,
//   } as GetStaticPathsResult;
// };

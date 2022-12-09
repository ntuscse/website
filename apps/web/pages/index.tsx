import { BlogCard, FooterContentButton, Hero, HeroProps } from "ui";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { getAllBlogPosts } from "lib/api/wordpress";
import { BlogProps } from "./blog";
import { getDisplayDate } from "lib/helpers/getDisplayDate";
import Link from "next/link";
// import { blogsData } from "@/pages/api/blogs";

type HomeProps = BlogProps;

const Home = ({ posts }: HomeProps) => {
  const heroProps: HeroProps = {
    backgroundImage: "/banners/scse-club-banner.png",
    backgroundGradient: "linear(to-r, whiteAlpha.500, whiteAlpha.500)",
    text: "WELCOME TO SCSE CLUB",
    buttons: [
      {
        label: "LEARN MORE",
        href: "/events",
        buttonType: "primary.blue",
      },
      {
        label: "CONTACT US",
        href: "/contact",
        buttonType: "primary.black",
      },
    ],
  };

  return (
    <>
      <Hero {...heroProps} />
      <VStack mx={{ base: 5, lg: 10 }}>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={12}
          pt={12}
          pb={32}
        >
          {posts?.slice(0, 6).map((post) => (
            <GridItem key={post.node.slug}>
              <Link href={`blog/${post.node.slug}`}>
                <BlogCard
                  blogCardImageProps={{
                    src: post.node.featuredImage?.node?.link ?? "",
                    alt: "",
                  }}
                  blogCardContentProps={{
                    title: post.node.title,
                    body: post.node.excerpt + "...",
                    date: getDisplayDate(new Date(post.node.date)),
                  }}
                />
              </Link>
            </GridItem>
          ))}
        </Grid>
      </VStack>
      <FooterContentButton
        href="./contact"
        label="Contact Us"
        title="Let’s work together"
      />
    </>
  );
};

export default Home;

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
            .substring(0, 200),
        },
      })),
    },
    revalidate: 10,
  } as GetStaticPropsResult<BlogProps>;
};

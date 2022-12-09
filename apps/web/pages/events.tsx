import { VStack, Heading, Grid, GridItem } from "@chakra-ui/react";
import { BlogCard, FooterContentButton, Hero } from "ui";
import { blogsData } from "@/pages/api/blogs";

const Events = () => {
  return (
    <>
      <Hero
        backgroundImage="/banners/events-banner.png"
        backgroundGradient="linear(to-r, whiteAlpha.500, whiteAlpha.500)"
      />
      <VStack mx={{ base: 5, lg: 10 }}>
        <Heading p={5}>Recent/Ongoing Events</Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={12}
          pb={32}
        >
          {blogsData.map((blogCardProps) => (
            <GridItem key={blogCardProps.textContent.title}>
              <BlogCard {...blogCardProps} />
            </GridItem>
          ))}
        </Grid>
      </VStack>
      <FooterContentButton
        href="./contact"
        label="Contact Us"
        title="Let's Talk"
      />
    </>
  );
};

export default Events;

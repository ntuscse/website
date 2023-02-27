import React from "react";
import { Box, Center, Link } from "@chakra-ui/react";
import { BlogCardImage, BlogCardImageProps } from "./BlogCardImage";
import { BlogCardContent, BlogCardContentProps } from "./BlogCardContent";

export interface BlogCardProps {
  href: string;
  blogCardImageProps: BlogCardImageProps;
  blogCardContentProps: BlogCardContentProps;
}

export const BlogCard = ({
  href,
  blogCardImageProps,
  blogCardContentProps,
}: BlogCardProps) => {
  return (
    <Center py={6}>
      <Link href={href} _hover={{ textDecoration: "none" }}>
        <Box
          maxW="445px"
          w="full"
          minH="600px"
          bg="brand.white"
          boxShadow="2xl"
          rounded="2xl"
          p={6}
          overflow="hidden"
          _hover={{
            bg: "brand.gray",
          }}
          transition="transform 0.25s ease"
        >
          {/* Image */}
          <BlogCardImage {...blogCardImageProps} />

          {/* Content */}
          <BlogCardContent {...blogCardContentProps} />
        </Box>
      </Link>
    </Center>
  );
};

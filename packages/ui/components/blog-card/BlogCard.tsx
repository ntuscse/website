import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { BlogCardImage, BlogCardImageProps } from "./BlogCardImage";
import { BlogCardContent, BlogCardContentProps } from "./BlogCardContent";

export interface BlogCardProps {
  blogCardImageProps: BlogCardImageProps;
  blogCardContentProps: BlogCardContentProps;
}

export const BlogCard = ({
  blogCardImageProps,
  blogCardContentProps,
}: BlogCardProps) => {
  return (
    <Center py={6}>
      <Box
        maxW="445px"
        w="full"
        minH="600px"
        bg="white"
        boxShadow="2xl"
        rounded="2xl"
        p={6}
        overflow="hidden"
        _hover={{
          bg: "gray.50",
        }}
        transition="transform 0.25s ease"
      >
        {/* Image */}
        <BlogCardImage {...blogCardImageProps} />

        {/* Content */}
        <BlogCardContent {...blogCardContentProps} />
      </Box>
    </Center>
  );
};

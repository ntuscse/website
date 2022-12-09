import React, { useContext } from "react";
import Image, { ImageProps } from "next/image";
import { Box } from "@chakra-ui/react";

export interface BlogCardImageProps extends ImageProps {}

export const BlogCardImage = ({ alt, src, ...props }: BlogCardImageProps) => {
  return (
    <Box
      h={280}
      mt={-6}
      mx={-6}
      mb={6}
      pos="relative"
      _hover={{ cursor: "pointer" }}
    >
      <Image
        src={src}
        alt={alt}
        fill={true}
        style={{ objectFit: "cover" }}
        {...props}
      />
    </Box>
  );
};

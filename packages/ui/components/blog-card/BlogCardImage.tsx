import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Box } from "@chakra-ui/react";

export interface BlogCardImageProps extends ImageProps {}

export const BlogCardImage = ({ alt, src, ...props }: BlogCardImageProps) => {
    const [imageError, setImageError] = useState(false);
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
        src={imageError ? `https://via.placeholder.com/445x280?text=${alt}` : src}
        alt={alt}
        fill={true}
        style={{ objectFit: "fill" }}
        onError={() => setImageError(true)}
        {...props}
      />
    </Box>
  );
};

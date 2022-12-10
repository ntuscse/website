import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Box, Text } from "@chakra-ui/react";

export interface BlogCardImageProps extends ImageProps {}

export const BlogCardImage = ({ alt, src, ...props }: BlogCardImageProps) => {
  const [imageError, setImageError] = useState(!src);

  return (
    <Box
      h={280}
      mt={-6}
      mx={-6}
      mb={6}
      pos="relative"
      _hover={{ cursor: "pointer" }}
    >
      {!imageError ?
        <Image
          src={src}
          alt={alt}
          fill={true}
          style={{ objectFit: "fill" }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          onError={() => setImageError(true)}
          {...props}
        /> :
        <Box
          h="100%"
          w="100%"
          bgColor="blackAlpha.300"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="blackAlpha.500">{alt}</Text>
        </Box>
      }
    </Box>
  );
};

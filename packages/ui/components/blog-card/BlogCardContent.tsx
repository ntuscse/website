import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

export interface BlogCardContentProps {
  title: string;
  body: string;
  date: string;
}

export const BlogCardContent = ({
  title,
  body,
  date,
}: BlogCardContentProps) => {
  return (
    <Stack fontFamily="Verdana">
      {/* Title */}
      <Heading
        color="gray.700"
        fontSize="2xl"
        fontFamily="body"
        _hover={{ cursor: "pointer", color: "brand.navy.medium" }}
        data-testid="blog-card-title"
      >
        {title}
      </Heading>

      {/* Date */}
      <Text
        color="brand.gray.medium"
        _before={{ content: '"🕓 "' }}
        data-testid="blog-card-date"
      >
        {date}
      </Text>

      {/* Body */}
      <Text color="gray.500" data-testid="blog-card-excerpt">
        {body}
      </Text>
    </Stack>
  );
};

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
      >
        {title}
      </Heading>

      {/* Date */}
      <Text color="brand.gray.medium" _before={{ content: '"🕓 "' }}>
        {date}
      </Text>

      {/* Body */}
      <Text color="gray.500">{body}</Text>
    </Stack>
  );
};

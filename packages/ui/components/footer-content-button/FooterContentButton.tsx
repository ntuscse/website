import React from "react";
import { VStack, Heading } from "@chakra-ui/react";
import { ButtonLink } from "ui";

export interface FooterContentButtonProps {
  href: string;
  title?: string;
  label: string;
}

export const FooterContentButton = ({
  href,
  title,
  label,
}: FooterContentButtonProps) => {
  return (
    <VStack bg="black" py="30px" px="1.25em">
      <Heading
        textAlign="center"
        as="h2"
        size="lg"
        py="10px"
        fontWeight="600"
        fontFamily="Roboto, Sans-serif"
        color="white"
      >
        {title}
      </Heading>
      <ButtonLink textTransform="uppercase" label={label} href={href} />
    </VStack>
  );
};

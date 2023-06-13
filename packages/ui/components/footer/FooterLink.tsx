import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

export interface FooterLinkProps {
  href: string;
  label: string;
}

export const FooterLink = ({ href, label }: FooterLinkProps) => {
  return (
    <Link
      as={NextLink}
      fontWeight="bold"
      textAlign="center"
      color="white"
      href={href}
      _hover={{ color: "blue.500" }}
    >
      {label}
    </Link>
  );
};

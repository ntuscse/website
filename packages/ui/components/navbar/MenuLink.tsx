import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export interface MenuLinkProps {
  label: string;
  href: string;
}

export const MenuLink = ({ label, href = "/" }: MenuLinkProps) => {
  const router = useRouter();
  return (
    <Link
      as={NextLink}
      href={href}
      color={router?.pathname === href ? "brand.red.dark" : "brand.navy.dark"}
      _hover={{ color: "brand.red.dark" }}
      _focus={{ color: "brand.red.dark" }}
    >
      <Text
        display="block"
        fontWeight="semibold"
        fontSize="18px"
      >
        {label}
      </Text>
    </Link>
  );
};

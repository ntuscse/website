import React from "react";
import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { MenuLink, MenuLinkProps } from "./MenuLink";

interface MenuItemProps {
  isOpen?: boolean;
  links: Array<MenuLinkProps>;
}

export const MenuItems = ({ isOpen = false, links }: MenuItemProps) => {
  return (
    <Box
      display={{ base: isOpen ? "flex" : "none", xl: "flex" }}
      flexBasis={{ base: "100%", md: "auto" }}
      flexDir={{ base: "column", xl: "row" }}
      justifyContent="space-between"
      marginLeft={10}
      minW="90%"
    >
      <Stack
        spacing={8}
        align={{ base: "left", xl: "center" }}
        justify={"flex-end"}
        direction={{ base: "column", xl: "row" }}
        pt={0}
        fontWeight="bold"
      >
        {links.map((link) => {
          return (
            <MenuLink
              key={link.label}
              label={link.label}
              href={link.href}
            />
          );
        })}
      </Stack>

      {/* CTA Button -> Contact */}
      <Link
        href={"/contact"}
        _hover={{
          bgColor: "brand.red.dark"
        }}
        bgColor="brand.red.medium"
        color="white"
        px="16px"
        py="10px"
        mt={{ base: 8, xl: 0 }}
        borderRadius="6px"
        w="max-content"
        display={{ base: "block", xl: "block" }}
      >
        <Text display="block">Contact</Text>
      </Link>
    </Box>
  );
};

import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MenuLink, MenuLinkProps } from "./MenuLink";
import CartButton from "../merch/CartButton";
import routes from "../../../../apps/web/features/merch/constants/routes";

interface MenuItemProps {
  isOpen?: boolean;
  links: Array<MenuLinkProps>;
}

export const MenuItems = ({ isOpen = false, links }: MenuItemProps) => {

  const router = useRouter()
  const [route, setRoute] = useState('')

  useEffect(() => {
    setRoute(router.pathname),
    []
  })

  const regexp = /\/merch*/;
  
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
      {/* If on merch site, change to Cart */}
      <Link
        href={route.match(regexp) ? routes.CART : "/contact"}
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
          {route.match(regexp) ? <CartButton /> :
          <Text display="block">Contact</Text>}
      </Link>
    </Box>
  );
};

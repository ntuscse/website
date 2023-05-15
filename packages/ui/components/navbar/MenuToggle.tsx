import React from "react";
import { Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

interface MenuToggleProps {
  toggle: React.MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
}

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box
      display={{ base: "block", xl: "none" }}
      onClick={toggle}
      color="brand.white"
      bgColor={ isOpen ? "brand.red.dark" : "brand.red.medium" }
      p="6px"
      borderRadius="6px"
      _hover={{ bgColor: "brand.red.dark", cursor: "pointer" }}
      marginLeft={{ base: 5, md: 10 }}
    >
      <HamburgerIcon boxSize={{ base: 6, md: 8 }} />
    </Box>
  );
};

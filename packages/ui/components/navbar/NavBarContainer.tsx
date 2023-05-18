import { Flex, StackProps } from "@chakra-ui/react";
import React from "react";

interface NavBarContainerProps extends StackProps {
  children: React.ReactNode;
}

export const NavBarContainer = ({
  children,
  ...props
}: NavBarContainerProps) => {
  return (
    <Flex
      as="nav"
      position="fixed"
      zIndex={100}
      backdropFilter="auto"
      backdropBlur="base"
      align="center"
      justify="space-between"
      w="100vw"
      pl={4}
      pr={8}
      color="brand.navy-dark"
      {...props}
    >
      {children}
    </Flex>
  );
};

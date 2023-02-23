import { Flex, StackProps } from "@chakra-ui/react";
import React from "react";

interface NavBarContainerProps extends StackProps {
    children: React.ReactNode,
}

export const NavBarContainer = ({ children, ...props }: NavBarContainerProps) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            w="100%"
            p={[3, 3, 5, 5]}
            pl={4}
            pr={8}
            bg="brand.white"
            color="brand.black"
            borderBottom="1px"
            borderColor="brand.gray.midlight"
            {...props}
        >
            { children }
        </Flex>
    )
}

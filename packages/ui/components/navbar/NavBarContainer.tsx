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
            mb={8}
            p={[3, 3, 6, 6]}
            pl={[4, 4, 5, 5]}
            pr={8}
            bg="white"
            color="black"
            borderBottom="1px"
            borderColor="gray.200"
            {...props}
        >
            { children }
        </Flex>
    )
}
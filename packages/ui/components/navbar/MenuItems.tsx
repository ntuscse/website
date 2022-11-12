import React from 'react'
import { Box, Stack } from '@chakra-ui/react';
import { MenuLink, MenuLinkProps } from "./MenuLink";

interface MenuItemProps {
    isOpen?: boolean
    links: Array<MenuLinkProps>
}

export const MenuItems = ({ isOpen=false, links }: MenuItemProps) => {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", xl: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
            marginLeft={10}>
            <Stack
                spacing={8}
                align={{ base: "left", xl: "center" }}
                justify={"flex-end"}
                direction={{ base: "column", xl: "row" }}
                pt={0}
                fontSize={{ base: 22, xl: 15 }}
                fontWeight="bold"
            >
                {links.map(link => {
                    return (<MenuLink key={link.label} label={link.label} href={link.href} />)
                })}
            </Stack>
        </Box>
    )
}
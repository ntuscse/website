import React from 'react'
import { Box, Stack, StackProps, Text, Link } from '@chakra-ui/react';
import { useRouter } from "next/router";

interface MenuItemProps {
    children: React.ReactNode
    to: string
}

const MenuLink = ({ children, to="/"}: MenuItemProps) => {
    const router = useRouter()

    return (
        <Link
            href={to}
            color={router.pathname === to ? "blue.600" : "black"}
            _hover={{color: "blue.600"}}
        >
            <Text display="block">
                {children}
            </Text>
        </Link>
    )
}

interface MenuLinksProps extends StackProps {
    isOpen?: boolean
}

const MenuItem = ({ isOpen=false, ...props }: MenuLinksProps) => {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", xl: "block"}}
            flexBasis={{ base: "100%", md: "auto" }}>
            <Stack
                spacing={8}
                align="center"
                justify={"flex-end"}
                direction={"row"}
                pt={0}
                fontSize={18}
                fontWeight="bold"
                { ...props }
            >
                <MenuLink to="/">Home</MenuLink>
                <MenuLink to="/academics">Academics</MenuLink>
                <MenuLink to="/events">Events</MenuLink>
                <MenuLink to="/sponsors">Sponsors</MenuLink>
                <MenuLink to="/contact">Contact</MenuLink>
            </Stack>
        </Box>
    )
}

export default MenuItem
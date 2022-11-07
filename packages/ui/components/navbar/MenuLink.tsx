import { Link, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

export interface MenuLinkProps {
    label: string
    href: string
}

export const MenuLink = ({ label, href="/" }: MenuLinkProps) => {
    const router = useRouter()

    return (
        <Link
            href={href}
            color={router?.pathname === href ? "blue.600" : "black"}
            _hover={{ color: "blue.600" }}
            _focus={{ color: "blue.600" }}
        >
            <Text display="block">
                {label}
            </Text>
        </Link>
    )
}
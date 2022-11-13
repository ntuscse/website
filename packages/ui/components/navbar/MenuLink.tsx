import { Link, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

export interface MenuLinkProps {
    label: string
    href: string
    menuLinkStyle?: 'default' | 'button.golden'
}

export const MenuLink = ({ label, href="/", menuLinkStyle='default' }: MenuLinkProps) => {
    switch (menuLinkStyle) {
        case 'button.golden':
            return <ButtonMenuLinkGolden label={ label } href={ href } />
        default:
            return <DefaultMenuLink label={ label } href={ href } />
    }
}

const DefaultMenuLink = ({ label, href }: MenuLinkProps) => {
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

const ButtonMenuLinkGolden = ({ label, href }: MenuLinkProps) => {
    return (
        <Link
            href={ href }
            _hover={{
                bgColor: 'transparent',
                color: 'orange.400'
            }}
            bgColor='orange.300'
            px={ 4 }
            py={ 2 }
            borderRadius='5px'
        >
            <Text display="block">
                { label }
            </Text>
        </Link>
    )
}
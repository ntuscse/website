import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { MenuItems } from "./MenuItems";
import { MenuLinkProps } from "./MenuLink";

interface NavDrawerProps {
    isOpen: boolean
    onClose: () => void
    links: Array<MenuLinkProps>
}

export const NavDrawer = ({ isOpen, onClose, links }: NavDrawerProps) => {
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent bgColor="brand.gray.light">
                    <DrawerCloseButton />

                    <DrawerBody marginTop={100}>
                        <MenuItems
                            isOpen={isOpen}
                            links={links}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
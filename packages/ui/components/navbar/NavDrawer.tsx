import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { MenuItem } from "./MenuItem";
import {MenuLinkProps} from "./MenuLink";

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
                <DrawerContent bgColor="gray.50">
                    <DrawerCloseButton />

                    <DrawerBody marginTop={100}>
                        <MenuItem
                            isOpen={isOpen}
                            links={links}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
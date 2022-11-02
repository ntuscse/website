import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import MenuItem from "./MenuItem";

interface NavDrawerProps {
    isOpen: boolean
    onClose: () => void
}

const NavDrawer = ({ isOpen, onClose }: NavDrawerProps) => {
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
                            direction="column"
                            align="left"
                            fontSize={22}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NavDrawer
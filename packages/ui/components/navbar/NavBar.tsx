import React from "react";
import NavBarContainer from "./NavBarContainer";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";
import MenuItem from "./MenuItem";
import NavDrawer from "./NavDrawer";
import { useDisclosure } from "@chakra-ui/react";


export const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <NavBarContainer>
            <Logo />
            <MenuItem />

            {/* For small screen sizes */}
            <MenuToggle toggle={onOpen} isOpen={isOpen} />
            <NavDrawer isOpen={isOpen} onClose={onClose} />
        </NavBarContainer>
    )
}

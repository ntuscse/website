import React from "react"
import { Box } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"

interface MenuToggleProps {
    toggle: React.MouseEventHandler<HTMLDivElement>
    isOpen: boolean
}

const MenuToggle = ({ toggle, isOpen } : MenuToggleProps) => {
    return (
        <Box
            display={{ base: "block", xl: "none"}}
            onClick={toggle}
            _hover={{color: "blue.600", cursor: "pointer"}}
        >
            {isOpen ?
                <CloseIcon boxSize={{ base: 5, md: 8 }} /> :
                <HamburgerIcon boxSize={{ base: 8, md: 10 }} />}
        </Box>
    )
}

export default MenuToggle
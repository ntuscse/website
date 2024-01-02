import { Flex, Stack } from "@chakra-ui/react"
import { ReactNode } from "react"
import MenuItem from "./MenuItem"

interface NavLink {
    name: string
    route: string
}

type NavLinkArray = NavLink[]

interface Props {
    logo: ReactNode
    /** Array of links to be displayed on the right side of the menu */
    navLinks: NavLinkArray
}
const NavBar = ({ logo, navLinks }: Props) => {
    return (
        <Flex
            as={"nav"}
            align={"center"}
            justify={"space-between"}
            wrap={"wrap"}
            w={"100%"}
            p={8}
            bg={"primary"}>
            {logo}

            <Stack
                spacing={8}
                align="center"
                justify={"flex-end"}
                direction={"row"}>
                    {navLinks.map((item) => { return (<MenuItem to={item.route}>{item.name}</MenuItem>)})}
            </Stack>
        </Flex>)
}

export default NavBar
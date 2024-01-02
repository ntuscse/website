import { Link, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
    to: string
}

const MenuItem = ({children, to}: Props) => {
    return (
        <Link href={to}>
            <Text display="block" color="white">
                {children}
            </Text>

        </Link>
    )
}

export default MenuItem
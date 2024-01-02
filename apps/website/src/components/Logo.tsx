import { Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

// todo: replace with actual logo
const Logo = () => {
    return (
        <Link to="/">
            <Text color="white">SCSE Challenge</Text>
        </Link>
    )
}

export default Logo
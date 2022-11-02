import React from "react"
import {Box, Text, Stack, Link} from "@chakra-ui/react"
import Image from "next/image";

const Logo = () => {
    return (
        <Link href="/" _hover={{textDecoration: "none"}}>
            <Stack
                align="center"
                justify={"flex-start"}
                direction={"row"}
            >
                <Box
                    minWidth={{ base: 75, md: 125}}
                    maxWidth={{ base: 75, md: 125}}
                    transitionDuration="200ms"
                >
                    <Image
                        src="/scse-logo.png"
                        alt="SCSE Logo"
                        width={125}
                        height={125}
                    />
                </Box>
                <Text
                    fontSize={[12, 12, 32, 32]}
                    fontWeight="bold"
                    transitionDuration="200ms"
                >
                    NTU School of Computer Science & Engineering Club
                </Text>
            </Stack>
        </Link>

    )
}

export default Logo
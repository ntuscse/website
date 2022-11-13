import React from "react"
import { Box, Text, Stack, Link } from "@chakra-ui/react"
import Image from "next/image";

export interface LogoProps {
    src: string
    alt: string
    text?: string
}

export const Logo = ({ src, alt, text } : LogoProps) => {
    return (
        <Link href="/" _hover={{ textDecoration: "none" }}>
            <Stack
                align="center"
                justify={"flex-start"}
                direction={"row"}
            >
                <Box
                    minWidth={{ base: 75, md: 100 }}
                    maxWidth={{ base: 75, md: 100 }}
                    transitionDuration="200ms"
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={100}
                        height={100}
                    />
                </Box>
                <Text
                    fontSize={[12, 12, 24, 24]}
                    fontWeight="bold"
                    transitionDuration="200ms"
                >
                    {text}
                </Text>
            </Stack>
        </Link>
    )
}
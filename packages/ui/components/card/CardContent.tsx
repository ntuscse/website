import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LinkContext } from "./Card";

export interface CardContentProps {
    title: string
    body: string
    date: string
}

export const CardContent = ({ title, body, date }: CardContentProps) => {
    return (
        <Stack pb={ 12 } fontFamily='Verdana'>
            {/* Title */}
            <Heading
                color='gray.700'
                fontSize='2xl'
                fontFamily='body'
                _hover={{ cursor: 'pointer', color: 'blue.600' }}>
                <Link href={ useContext(LinkContext) } _hover={{ textDecoration: 'none' }}>
                    { title }
                </Link>
            </Heading>

            {/* Date */}
            <Text
                color='gray.400'
                _before={{ content: '"🕓 "' }}>
                { date }
            </Text>

            {/* Body */}
            <Text color='gray.500'>
                { body }
            </Text>
        </Stack>
    )
}
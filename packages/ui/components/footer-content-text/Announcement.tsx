import { Heading, Flex, Text } from "@chakra-ui/react";
import React from "react";

export interface AnnouncementProps {
    title: string
    description: string
}

export const Announcement = ({ title, description } : AnnouncementProps) => {

    return (
        <Flex flexDir='column' px={{ base: '0px', md:'100px' }} py='20px' maxWidth="1400px">
            <Heading
                as='h2'
                size='lg'
                py='10px'
                fontWeight='600'
                fontFamily='Roboto, Sans-serif'
                color='brand.white'
            >
                {title}
            </Heading>
            <Text color='brand.white' textAlign={{ base: 'justify', md:'left' }}> {description} </Text>
        </Flex>
    )
}

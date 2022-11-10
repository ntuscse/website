import { Heading, Flex, Text } from "@chakra-ui/react";
import React from "react";

export interface AnnouncementProps {
    title: string
    description: string
}

export const Announcement = ({ title, description } : AnnouncementProps) => {

    return (
        <Flex flexDir='column' px={{ base: '0px', md:'100px' }} py='20px'>
            <Heading
                as='h2'
                size='lg'
                py='10px'
                fontWeight='600'
                fontFamily='Roboto, Sans-serif'
                color='white'
            >
                {title}
            </Heading>
            <Text color='white' textAlign={{ base: 'justify', md:'left' }}> {description} </Text>
        </Flex>
    )
}
import React from 'react'
import { VStack, Heading } from '@chakra-ui/react';
import { Button } from 'ui';

export interface ContentButtonProps {
    href: string
    title?: string
    label: string
}

export const ContentButton = ( { href, title, label } : ContentButtonProps) => {
    return (
        <VStack py='30px' >
            <Heading
                textAlign="center"
                as='h2'
                size='lg'
                py='10px'
                fontWeight='600'
                fontFamily='Roboto, Sans-serif'
                color='white'
            >
                { title }
            </Heading>
            <Button
                textTransform='uppercase'
                label={ label }
                href={ href }
            />
        </VStack>
    )
}

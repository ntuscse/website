import React from 'react'
import { VStack, Heading } from '@chakra-ui/react';
import { Button } from 'ui';

export interface ContentButtonProps {
    href: string
    ctaTitle: string
    btnText: string
}

export const ContentButton = ( { href, ctaTitle, btnText } : ContentButtonProps) => {
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
                {ctaTitle}
            </Heading>
            <Button
                bg='blue.500'
                borderColor='#ccd0d5'
                color='white'
                textTransform='uppercase'
                _hover={{ bg: 'white', color: 'black' }}
                label={btnText}
                href={href}
            />
        </VStack>
    )
}

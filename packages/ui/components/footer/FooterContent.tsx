import React from 'react'
import { VStack, Heading, Button, Box, Link } from '@chakra-ui/react';
import { Update, UpdateProps } from './Update';

export interface FooterContentProps {
    contentType?: 'content.button' | 'content.text' | null
    href: string
    ctaTitle: string
    btnText: string
    alerts: Array<UpdateProps>
}

export interface ContentButtonProps {
    href: string
    ctaTitle: string
    btnText: string
}

export interface ContentTextProps {
    alerts: Array<UpdateProps>
}


export const FooterContent = ( { contentType, href, ctaTitle, btnText, alerts } : FooterContentProps) => {
    let footerContent;
    switch (contentType){
        case 'content.button':
            footerContent = <ContentButton href={href} ctaTitle={ctaTitle} btnText={btnText} />
            break
        case 'content.text':
            footerContent = <ContentText alerts={alerts} />
            break
        case null:
            footerContent = null
            break
        default:
            footerContent = null
    }
    return footerContent
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
            >
                <Link href={ href } _hover={{ textDecoration: 'none' }}>
                    {btnText}
                </Link>
            </Button>
        </VStack>
    )
}

export const ContentText = ( { alerts } : ContentTextProps) => {
    return (
        <Box alignSelf='flex-start' px='20px' pb='30px'>
            { alerts.map(alert => (
                <Update title={alert.title} description={alert.description} />
            ))}
        </Box>
    )
}
